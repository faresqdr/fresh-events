#!/bin/bash

# Fresh Events - Odoo Connection Test

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}🧪 Testing Odoo Connection${NC}"
echo -e "${BLUE}════════════════════════════════════════${NC}\n"

# Load .env
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env not found!${NC}"
    exit 1
fi

source .env

echo -e "${BLUE}Configuration:${NC}"
echo -e "  URL: ${YELLOW}$ODOO_URL${NC}"
echo -e "  DB: ${YELLOW}$ODOO_DB${NC}"
echo -e "  User: ${YELLOW}$ODOO_USERNAME${NC}"
echo -e "  Port: ${YELLOW}$ODOO_RPC_PORT${NC}\n"

# Test 1: Check if Odoo is reachable
echo -e "${BLUE}📍 Test 1: Checking if Odoo is reachable...${NC}"
if curl -s -o /dev/null -w "%{http_code}" "$ODOO_URL" | grep -q "200\|301\|302"; then
    echo -e "${GREEN}✅ Odoo is reachable${NC}\n"
else
    echo -e "${YELLOW}⚠️  Could not verify Odoo via HTTP (might be behind firewall)${NC}\n"
fi

# Test 2: Start backend and test API
echo -e "${BLUE}📍 Test 2: Starting backend server...${NC}"
node server.js > /tmp/odoo_test.log 2>&1 &
SERVER_PID=$!
sleep 3

if ! ps -p $SERVER_PID > /dev/null; then
    echo -e "${RED}❌ Backend failed to start!${NC}"
    cat /tmp/odoo_test.log
    exit 1
fi

echo -e "${GREEN}✅ Backend started (PID: $SERVER_PID)${NC}\n"

# Test 3: Health check
echo -e "${BLUE}📍 Test 3: Health check...${NC}"
HEALTH=$(curl -s http://localhost:3001/api/health)
if echo "$HEALTH" | grep -q "running"; then
    echo -e "${GREEN}✅ Backend responding${NC}\n"
else
    echo -e "${YELLOW}Response: $HEALTH${NC}\n"
fi

# Test 4: Create test lead
echo -e "${BLUE}📍 Test 4: Creating test lead in Odoo...${NC}"
RESPONSE=$(curl -s -X POST http://localhost:3001/api/create-lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Fresh Events",
    "company": "Test Company",
    "email": "test@freshevents.local",
    "phone": "+33612345678",
    "message": "Test lead from script - $(date)"
  }')

echo -e "${YELLOW}Response:${NC}"
echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"

if echo "$RESPONSE" | grep -q "success"; then
    echo -e "\n${GREEN}✅ Lead created successfully!${NC}"
    LEAD_ID=$(echo "$RESPONSE" | jq -r '.leadId' 2>/dev/null)
    echo -e "   Lead ID: ${YELLOW}$LEAD_ID${NC}\n"
    echo -e "${BLUE}Check your Odoo CRM:${NC}"
    echo -e "  ${YELLOW}$ODOO_URL/web#view_type=form&model=crm.lead&id=$LEAD_ID${NC}\n"
elif echo "$RESPONSE" | grep -q "error"; then
    echo -e "\n${RED}❌ Error creating lead${NC}\n"
    echo -e "${YELLOW}Error details:${NC}"
    echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
fi

# Cleanup
echo -e "${BLUE}📍 Cleaning up...${NC}"
kill $SERVER_PID 2>/dev/null || true
sleep 1

echo -e "\n${BLUE}════════════════════════════════════════${NC}"
echo -e "${GREEN}✨ Test complete!${NC}\n"

# Show logs if there were errors
if [ -s /tmp/odoo_test.log ]; then
    echo -e "${YELLOW}📋 Server logs:${NC}"
    cat /tmp/odoo_test.log
fi
