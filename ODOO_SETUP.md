# Fresh Events - Odoo Integration Setup

## Overview
The contact form is now integrated with Odoo via XML-RPC. When users submit the form, it automatically creates a lead in the Odoo CRM under the "Events" module.

## Setup Instructions

### 1. Install Backend Dependencies
```bash
npm install
```

This will install:
- `express` - Web server framework
- `xmlrpc` - XML-RPC client for Odoo communication
- `cors` - Cross-origin request handling
- `dotenv` - Environment variable management

### 2. Configure Odoo Connection

Edit `.env` file with your Odoo instance details:

```env
# Odoo Configuration
ODOO_URL=http://your-odoo-server.com          # Your Odoo base URL
ODOO_DB=your_database_name                    # Odoo database name
ODOO_USERNAME=your_username                   # Odoo user (usually 'admin')
ODOO_PASSWORD=your_password                   # Odoo user password
ODOO_RPC_PORT=8069                           # Odoo XML-RPC port (usually 8069)

# Server Configuration
PORT=3001                                      # Backend server port
NODE_ENV=development                           # Environment (development/production)
```

### 3. Run the Backend Server

In a separate terminal:
```bash
npm run server
```

Expected output:
```
✅ Fresh Events Backend Server running on port 3001
📧 Contact form will submit to: http://localhost:3001/api/create-lead
🔗 Odoo instance: http://your-odoo-server.com
```

### 4. Run the Frontend (in another terminal)

```bash
npm run dev
```

## How It Works

### Form Submission Flow
1. User fills out the contact form on `/contact` page
2. Form validates required fields (name, email, company)
3. Form data is sent as POST request to `http://localhost:3001/api/create-lead`
4. Backend server authenticates with Odoo using XML-RPC
5. Creates a lead record in Odoo's `crm.lead` model
6. Returns success/error response to frontend
7. User sees confirmation message with lead ID

### Lead Fields Mapping
- **form.name** → Odoo Lead: `name`
- **form.email** → Odoo Lead: `email_from`
- **form.phone** → Odoo Lead: `phone`
- **form.company** → Odoo Lead: `company_name`
- **form.message** → Odoo Lead: `description`
- Type is set to `'lead'` automatically

## Backend API Endpoints

### POST `/api/create-lead`
Creates a new lead in Odoo

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "ACME Corp",
  "email": "john@example.com",
  "phone": "+33612345678",
  "message": "Interested in catering services"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Lead created successfully in Odoo",
  "leadId": 42
}
```

**Error Response (400/500):**
```json
{
  "error": "Error description",
  "details": "Detailed error message"
}
```

### GET `/api/health`
Health check endpoint

**Response:**
```json
{
  "status": "Backend server is running"
}
```

## Troubleshooting

### "Failed to authenticate with Odoo"
- Check ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD in .env
- Verify Odoo instance is running and accessible
- Ensure user has CRM access permissions

### "Connection refused"
- Backend server not running? Use `npm run server`
- Check if port 3001 is already in use
- Change PORT in .env if needed

### Lead not appearing in Odoo
- Check Odoo CRM module is installed
- Verify user has "Create" permissions on crm.lead
- Check Odoo server logs for XML-RPC errors

### CORS errors
- Backend must be running for form submission to work
- Ensure frontend is accessing `http://localhost:3001` (not HTTPS in development)

## Production Deployment

For production:
1. Update `.env` with production Odoo URL
2. Set `NODE_ENV=production`
3. Deploy backend server (Heroku, AWS, etc.)
4. Update frontend to point to production backend URL in ContactView.vue
5. Use HTTPS for all connections

## File Structure

```
fresh-events/
├── server.js                 # Backend Node.js server
├── .env                      # Your Odoo credentials (keep secret!)
├── .env.example              # Template for .env
├── package.json              # Dependencies including xmlrpc, express
└── src/views/ContactView.vue # Frontend form component
```

## Security Notes

⚠️ **Never commit `.env` file to version control!**

- `.env` is in `.gitignore` by default
- Always use `.env.example` as template
- Rotate Odoo passwords regularly
- In production, use environment variables from your hosting platform

