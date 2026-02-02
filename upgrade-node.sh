#!/bin/bash

# Script to upgrade Node.js on production server
# This script should be run on the production server, not locally

echo "🔍 Checking current Node.js version..."
node --version

echo ""
echo "📦 Installing Node.js 20 LTS using nvm..."

# Install nvm if not already installed
if ! command -v nvm &> /dev/null; then
    echo "Installing nvm..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    
    # Load nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Install and use Node.js 20 LTS
nvm install 20
nvm use 20
nvm alias default 20

echo ""
echo "✅ Node.js upgraded to:"
node --version

echo ""
echo "📌 To make this permanent, add these lines to your ~/.bashrc or ~/.zshrc:"
echo 'export NVM_DIR="$HOME/.nvm"'
echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"'
