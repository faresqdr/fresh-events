# Fresh Events - Odoo Integration Quick Start

## ⚡ Quick Setup (5 minutes)

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Configure Odoo credentials
Edit `.env` file:
```env
ODOO_URL=http://localhost:8069          # Change to your Odoo URL
ODOO_DB=fresh_events_db                 # Your database name
ODOO_USERNAME=admin                     # Your Odoo username
ODOO_PASSWORD=admin                     # Your Odoo password
PORT=3001
```

### Step 3: Start backend server (in one terminal)
```bash
npm run server
```

You should see:
```
✅ Fresh Events Backend Server running on port 3001
```

### Step 4: Start frontend (in another terminal)
```bash
npm run dev
```

## 🧪 Testing the Integration

1. Open browser: `http://localhost:5173`
2. Navigate to `/contact` page
3. Fill out the form:
   - **Identité**: John Doe
   - **Structure**: ACME Corp
   - **Email**: john@example.com
   - **Tel**: +33612345678
   - **Le Pitch**: Test lead creation
4. Click "Envoyer 🚀"
5. You should see: ✅ Lead créé avec succès! (ID: 42)

## 📋 Form Fields → Odoo Lead Mapping

| Frontend Field | Odoo Field | Required |
|---|---|---|
| Identité (name) | name | ✅ Yes |
| Structure (company) | company_name | ✅ Yes |
| Email | email_from | ✅ Yes |
| Tel | phone | ❌ Optional |
| Le Pitch (message) | description | ❌ Optional |

## 🐛 Common Issues

| Issue | Solution |
|---|---|
| "Connection refused" | Backend server not running. Use `npm run server` |
| "Failed to authenticate" | Check ODOO_URL, ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD in .env |
| CORS errors | Frontend can't reach backend. Ensure backend is on port 3001 |
| Lead not in Odoo | User might not have CRM permissions. Check Odoo user access |

## 📚 Full Documentation

See `ODOO_SETUP.md` for complete setup guide and troubleshooting.

## 🔑 Key Files

- **`server.js`** - Backend Node.js server with Odoo integration
- **`.env`** - Your Odoo credentials (KEEP SECRET!)
- **`src/views/ContactView.vue`** - Frontend form with submission logic
- **`ODOO_SETUP.md`** - Detailed setup instructions

## 🚀 Production Checklist

- [ ] Update ODOO_URL to production server
- [ ] Set NODE_ENV=production in .env
- [ ] Deploy backend server (Heroku, AWS, etc.)
- [ ] Update frontend API endpoint URL
- [ ] Use HTTPS for all connections
- [ ] Rotate Odoo password
- [ ] Test form submission end-to-end
