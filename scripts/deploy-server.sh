#!/bin/bash

# Fresh Events - Server Deployment Script
# Usage: ./scripts/deploy-server.sh user@server.com /path/to/app

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${BLUE}🚀 Fresh Events - Server Deployment${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# Check arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}❌ Usage: ./scripts/deploy-server.sh user@server.com /path/to/app${NC}"
    echo -e "${YELLOW}Example: ./scripts/deploy-server.sh deploy@example.com /var/www/fresh-events${NC}"
    exit 1
fi

SERVER=$1
APP_PATH=$2
LOCAL_DIR="$(pwd)"

echo -e "${BLUE}📍 Deployment Configuration:${NC}"
echo -e "   Server: ${YELLOW}$SERVER${NC}"
echo -e "   Path: ${YELLOW}$APP_PATH${NC}"
echo -e "   Local: ${YELLOW}$LOCAL_DIR${NC}\n"

# Check if dist folder exists
if [ ! -d "$LOCAL_DIR/dist" ]; then
    echo -e "${RED}❌ ./dist folder not found!${NC}"
    echo -e "${YELLOW}Run 'npm run build' first to build the frontend${NC}"
    exit 1
fi

# Step 1: Test SSH connection
echo -e "${BLUE}📍 Testing SSH connection...${NC}"
if ssh -q "$SERVER" exit; then
    echo -e "${GREEN}✅ SSH connection successful${NC}\n"
else
    echo -e "${RED}❌ Cannot connect to server${NC}"
    exit 1
fi

# Step 2: Prepare remote directory
echo -e "${BLUE}📍 Preparing remote directory...${NC}"
ssh "$SERVER" "mkdir -p $APP_PATH && cd $APP_PATH && pwd" > /dev/null
echo -e "${GREEN}✅ Remote directory ready${NC}\n"

# Step 3: Upload frontend build
echo -e "${BLUE}📍 Uploading frontend build (./dist)...${NC}"
rsync -avz --delete "$LOCAL_DIR/dist/" "$SERVER:$APP_PATH/dist/"
echo -e "${GREEN}✅ Frontend build uploaded${NC}\n"

# Step 4: Upload backend files
echo -e "${BLUE}📍 Uploading backend files...${NC}"
rsync -avz \
    --include="server.js" \
    --include="package.json" \
    --include="package-lock.json" \
    --include=".env" \
    --exclude="node_modules/" \
    --exclude=".git/" \
    --exclude="src/" \
    --exclude="*.vue" \
    "$LOCAL_DIR/" "$SERVER:$APP_PATH/"
echo -e "${GREEN}✅ Backend files uploaded${NC}\n"

# Step 5: Install dependencies on server
echo -e "${BLUE}📍 Installing dependencies on server...${NC}"
ssh "$SERVER" "cd $APP_PATH && npm install --production" > /dev/null 2>&1
echo -e "${GREEN}✅ Dependencies installed${NC}\n"

# Step 6: Test deployment
echo -e "${BLUE}📍 Testing deployment...${NC}"
ssh "$SERVER" "cd $APP_PATH && test -f server.js && test -d dist && echo 'OK'" > /dev/null 2>&1
echo -e "${GREEN}✅ Deployment files verified${NC}\n"

# Summary
echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Deployment Completed!${NC}\n"

echo -e "${YELLOW}📋 Next steps on your server:${NC}"
echo -e "1. SSH to your server:"
echo -e "   ${BLUE}ssh $SERVER${NC}"
echo -e "\n2. Navigate to app directory:"
echo -e "   ${BLUE}cd $APP_PATH${NC}"
echo -e "\n3. Check .env configuration:"
echo -e "   ${BLUE}cat .env${NC}"
echo -e "\n4. Start the server:"
echo -e "   ${BLUE}npm run server${NC}"
echo -e "\n   Or for production with PM2:"
echo -e "   ${BLUE}pm2 start server.js --name 'fresh-events'${NC}"

echo -e "\n${YELLOW}🌐 Access your site:${NC}"
echo -e "   Frontend: ${BLUE}http://your-server.com${NC}"
echo -e "   Backend API: ${BLUE}http://your-server.com:3001${NC}"

echo -e "\n${BLUE}════════════════════════════════════════${NC}\n"
