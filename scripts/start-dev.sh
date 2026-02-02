#!/bin/bash

# Fresh Events - Full Development Server Launcher
# Starts both frontend (Vite) and backend (Express) simultaneously

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}🚀 Fresh Events - Development Environment${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found!${NC}"
    echo -e "   Please create .env from .env.example"
    echo -e "   cp .env.example .env${NC}\n"
    exit 1
fi

echo -e "${GREEN}✅ Configuration loaded from .env${NC}\n"

echo -e "${BLUE}Starting services...${NC}\n"

# Use npm run dev:full if concurrently is available
if npm list concurrently > /dev/null 2>&1; then
    echo -e "${BLUE}📍 Using concurrently to run both servers${NC}\n"
    npm run dev:full
else
    echo -e "${YELLOW}⚠️  concurrently not found, using serial mode${NC}\n"
    echo -e "${BLUE}📍 Starting backend server...${NC}"
    npm run server &
    BACKEND_PID=$!
    
    sleep 2
    
    echo -e "${BLUE}📍 Starting frontend dev server...${NC}"
    npm run dev
fi
