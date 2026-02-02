#!/bin/bash

# Check which team is actually assigned to the created lead

set -e

source .env

# Start backend
node server.js > /tmp/server.log 2>&1 &
SERVER_PID=$!
sleep 2

# Create a lead
RESPONSE=$(curl -s -X POST http://localhost:3001/api/create-lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Team Check",
    "company": "Test",
    "email": "test@test.com",
    "phone": "+33612345678",
    "message": "Test"
  }')

LEAD_ID=$(echo "$RESPONSE" | jq -r '.leadId')

echo "Created lead ID: $LEAD_ID"

# Kill server
kill $SERVER_PID 2>/dev/null || true
sleep 1

# Check the lead in Odoo to see actual team_id
echo -e "\nLead Odoo URL:"
echo "https://odoo.freshfoodamneville.fr/web#view_type=form&model=crm.lead&id=$LEAD_ID"
echo -e "\n⚠️  Check in Odoo what Team is assigned to this lead"
echo "If it's not 'Events' (ID 6), we need to fix the team_id"
