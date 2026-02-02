# Fresh Events - Development & Deployment Guide

## 🚀 Quick Commands

### Run Both Frontend & Backend Together
```bash
npm run dev:full
```
or with Make:
```bash
make dev-full
```

This will start:
- **Frontend**: Vite dev server on http://localhost:5173
- **Backend**: Express server on http://localhost:3001

### Run Individually
**Frontend only:**
```bash
npm run dev
# or
make dev
```

**Backend only:**
```bash
npm run server
# or
make server
```

## 📦 Deployment Workflow

### 1-Click Local Deployment Preparation
Pulls latest code, installs dependencies, and builds everything:
```bash
npm run deploy
```
or
```bash
make deploy
```

This will:
1. ✅ Pull latest changes from git
2. ✅ Install/update dependencies
3. ✅ Build Vue frontend to `./dist/`
4. ✅ Create deployment info file
5. ✅ Generate ready-to-deploy folder

### 1-Click Server Deployment
Deploy to your server with one command:
```bash
make deploy-server SERVER=user@yourserver.com PATH=/var/www/fresh-events
```

or using the script directly:
```bash
./scripts/deploy-server.sh user@yourserver.com /var/www/fresh-events
```

**This will:**
1. ✅ Upload `./dist/` (frontend build)
2. ✅ Upload backend files (server.js, package.json, .env)
3. ✅ Install npm dependencies on server
4. ✅ Verify everything is in place

## 📋 Available Commands

### Development
| Command | What it does |
|---------|------------|
| `make dev` | Start frontend only |
| `make dev-full` | Start frontend + backend |
| `make server` | Start backend only |
| `make install` | Install dependencies |

### Production
| Command | What it does |
|---------|------------|
| `make build` | Build frontend for production |
| `make deploy` | Local deployment prep (pull, install, build) |
| `make deploy-server` | Deploy to server (requires SERVER and PATH) |
| `make clean` | Remove build artifacts & node_modules |

### Utilities
| Command | What it does |
|---------|------------|
| `make help` | Show all available commands |
| `make status` | Show project status |

## 🔧 Complete Deployment Example

### Scenario: Deploy to production server

**Step 1: Prepare everything locally**
```bash
make deploy
```
This will pull latest code, build everything, and show you what's ready.

**Step 2: Deploy to server**
```bash
make deploy-server SERVER=deploy@production.com PATH=/var/www/fresh-events
```

**Step 3: Connect to server and start**
```bash
ssh deploy@production.com
cd /var/www/fresh-events
npm run server
```

Or use PM2 for production:
```bash
pm2 start server.js --name "fresh-events"
pm2 save
pm2 startup
```

## 📂 File Structure After Build

```
fresh-events/
├── dist/                    # Frontend build (ready to serve)
│   ├── index.html
│   ├── assets/
│   ├── DEPLOYMENT_INFO.json
│   └── ...
├── server.js               # Backend server
├── package.json            # Dependencies
├── .env                    # Configuration
└── scripts/                # Deployment scripts
    ├── deploy.js           # Build & prepare
    └── deploy-server.sh    # Upload to server
```

## 🌐 Server Configuration

### Nginx Example
Serve frontend and proxy backend:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Serve frontend
    location / {
        root /var/www/fresh-events/dist;
        try_files $uri /index.html;
    }

    # Proxy backend API
    location /api/ {
        proxy_pass http://localhost:3001;
    }
}
```

### Apache Example
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /var/www/fresh-events/dist

    <Directory /var/www/fresh-events/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>

    ProxyPass /api http://localhost:3001/api
    ProxyPassReverse /api http://localhost:3001/api
</VirtualHost>
```

## ⚡ Production Tips

### Use PM2 for Process Management
```bash
npm install -g pm2

# Start server
pm2 start server.js --name "fresh-events"

# Make it restart on reboot
pm2 startup
pm2 save

# View logs
pm2 logs fresh-events

# Restart
pm2 restart fresh-events
```

### Update & Redeploy
```bash
# Pull latest code
git pull

# Run deployment
npm run deploy

# Restart backend
pm2 restart fresh-events
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3001
lsof -i :5173

# Kill process
kill -9 <PID>
```

### SSH Key Setup
```bash
# Generate SSH key if needed
ssh-keygen -t rsa -b 4096

# Copy to server
ssh-copy-id user@server.com

# Now deployment won't ask for password
```

### Check Deployment Status
```bash
make status
```

Shows:
- Node version
- NPM version
- Git status

## 📝 Before Pushing to Production

- [ ] Configure `.env` with production Odoo details
- [ ] Run `make deploy` to test build locally
- [ ] Verify `./dist` folder is created
- [ ] Test both frontend and backend locally
- [ ] Check database migrations if needed
- [ ] Set up SSL certificate (use Let's Encrypt)
- [ ] Configure email notifications
- [ ] Set up monitoring/logging
- [ ] Create backup of database
- [ ] Test complete deployment on staging first

## 🎯 Quick Deployment Checklist

```bash
# 1. Make sure all changes are committed
git status

# 2. Update environment variables
nano .env

# 3. Prepare for deployment
npm run deploy

# 4. Deploy to server (one command!)
make deploy-server SERVER=user@host PATH=/app/path

# 5. Connect and verify
ssh user@host
cd /app/path
npm run server
```

That's it! Your Fresh Events app is live! 🎉

