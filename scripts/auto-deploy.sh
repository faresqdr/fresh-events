#!/bin/bash
# Fresh Events - Auto-deploy watcher
#
# Runs on a timer (see fresh-events-autodeploy.timer). Checks origin/main for
# new commits; if found, pulls, installs deps and rebuilds. Nginx serves
# ./dist directly so no process restart is needed - the new build is live
# as soon as `npm run build` finishes.
#
# Safety: refuses to run if the working tree has uncommitted changes, so it
# never clobbers in-progress local edits.

set -euo pipefail

REPO_DIR="/var/www/fresh-events"
BRANCH="main"
LOCK_FILE="/tmp/fresh-events-autodeploy.lock"
LOG_FILE="$REPO_DIR/logs/auto-deploy.log"

mkdir -p "$REPO_DIR/logs"

exec 9>"$LOCK_FILE"
flock -n 9 || exit 0  # another run already in progress

cd "$REPO_DIR"

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"; }

git fetch origin "$BRANCH" --quiet

LOCAL_SHA=$(git rev-parse HEAD)
REMOTE_SHA=$(git rev-parse "origin/$BRANCH")

if [ "$LOCAL_SHA" = "$REMOTE_SHA" ]; then
    exit 0  # nothing new
fi

if [ -n "$(git status --porcelain)" ]; then
    log "SKIP: uncommitted local changes present, refusing to auto-deploy. Resolve manually (git status)."
    exit 1
fi

log "New commit on $BRANCH: $LOCAL_SHA -> $REMOTE_SHA"

if ! git pull --ff-only origin "$BRANCH" >> "$LOG_FILE" 2>&1; then
    log "FAILED: git pull was not a fast-forward, aborting. Check repo state manually."
    exit 1
fi

if ! npm ci >> "$LOG_FILE" 2>&1; then
    log "FAILED: npm ci"
    exit 1
fi

if ! npm run build >> "$LOG_FILE" 2>&1; then
    log "FAILED: npm run build - dist/ may be partially rebuilt, check manually before trusting the live site"
    exit 1
fi

log "DEPLOYED OK - now at $(git rev-parse HEAD)"
