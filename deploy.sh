#!/bin/bash

# Fresh Events - Build & Deploy to PM2
# Simple script to build and run on PM2

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 Fresh Events - Build & PM2 Deploy${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env not found!${NC}"
    exit 1
fi

# Step 1: Install dependencies
echo -e "${BLUE}📍 Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}\n"

# Step 2: Build frontend
echo -e "${BLUE}📍 Building frontend...${NC}"
npm run build
echo -e "${GREEN}✅ Frontend built${NC}\n"

# Step 3: Stop old PM2 process if running
echo -e "${BLUE}📍 Checking PM2...${NC}"
if pm2 list | grep -q "fresh-events"; then
    echo -e "${YELLOW}⚠️  Stopping existing process...${NC}"
    pm2 delete fresh-events
fi

# Step 4: Start with PM2
echo -e "${BLUE}📍 Starting backend with PM2...${NC}"
pm2 start server.js --name "fresh-events"
pm2 save

echo -e "\n${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Done!${NC}\n"
echo -e "${YELLOW}Frontend built to: ./dist/${NC}"
echo -e "${YELLOW}Backend running on PM2${NC}\n"
echo -e "${BLUE}View logs:${NC}"
echo -e "  pm2 logs fresh-events${NC}\n"
echo -e "${BLUE}Stop:${NC}"
echo -e "  pm2 stop fresh-events${NC}\n"
echo -e "${BLUE}Restart:${NC}"
echo -e "  pm2 restart fresh-events${NC}\n"
