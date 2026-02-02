# 🚀 Fresh Events - Quick Start Guide

## Installation

```bash
# 1. Install all dependencies
npm install

# 2. Copy example config and update it
cp .env.example .env
# Edit .env with your Odoo credentials
nano .env
```

## Development - Run Everything Together

### Option 1: Using npm (Recommended)
```bash
npm run dev:full
```

### Option 2: Using Make
```bash
make dev-full
```

### Option 3: Using the shell script
```bash
chmod +x scripts/start-dev.sh
./scripts/start-dev.sh
```

This will start:
- **Frontend**: http://localhost:5173 (Vue.js Vite dev server)
- **Backend**: http://localhost:3001 (Express API server)

## Development - Run Separately

### Frontend only
```bash
npm run dev
# or
make dev
```

### Backend only
```bash
npm run server
# or
make server
```

## Build for Production

### Prepare and Build Locally
```bash
npm run deploy
# or
make deploy
```

This will:
1. ✅ Pull latest from git
2. ✅ Install/update dependencies
3. ✅ Build Vue frontend to `./dist/`

### Deploy to Server

```bash
make deploy-server SERVER=user@yourserver.com PATH=/var/www/fresh-events
```

## File Structure

```
fresh-events/
├── src/                 # Frontend Vue.js code
│   ├── views/          # Page components
│   ├── components/     # Reusable components
│   ├── App.vue         # Main app
│   ├── main.js         # Entry point
│   └── style.css       # Global styles
├── dist/               # Built frontend (after npm run build)
├── server.js           # Backend Express server
├── .env                # Your config (DO NOT COMMIT!)
├── package.json        # Dependencies
├── Makefile            # Quick commands
├── scripts/            # Deployment scripts
│   ├── deploy.js       # Build & prepare
│   ├── deploy-server.sh # Upload to server
│   └── start-dev.sh    # Start both servers
└── README.md           # This file
```

## Common Commands

| Command | What it does |
|---------|------------|
| `npm run dev:full` | Start frontend + backend together |
| `npm run dev` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run build` | Build frontend for production |
| `npm run deploy` | Prepare deployment (build + test) |
| `make help` | Show all Make commands |

## Environment Variables

Your `.env` file should contain:

```env
# Odoo Server
ODOO_URL=http://localhost:8069
ODOO_DB=your_database
ODOO_USERNAME=admin
ODOO_PASSWORD=admin
ODOO_RPC_PORT=8069

# Backend Server
PORT=3001
NODE_ENV=development
```

⚠️ **NEVER commit `.env` to git!** It's in `.gitignore` for security.

## Troubleshooting

### Port already in use
```bash
# Find what's using the port
lsof -i :3001
lsof -i :5173

# Kill it
kill -9 <PID>
```

### Module not found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Frontend not connecting to backend
- Check backend is running on `:3001`
- Check `.env` has correct `PORT=3001`
- Restart frontend dev server

## Production Checklist

Before deploying to production:

- [ ] Update `.env` with production Odoo URL
- [ ] Run `npm run deploy` locally to test build
- [ ] Verify `./dist` folder created
- [ ] Check `./server.js` has no hardcoded values
- [ ] Set `NODE_ENV=production` in server `.env`
- [ ] Test form submission end-to-end
- [ ] Set up SSL/HTTPS
- [ ] Configure web server (Nginx/Apache)
- [ ] Set up PM2 or systemd service
- [ ] Configure database backups

## Need Help?

See detailed documentation:
- **Odoo Integration**: [ODOO_SETUP.md](ODOO_SETUP.md)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
- **Quick Deployment**: [ODOO_QUICK_START.md](ODOO_QUICK_START.md)

