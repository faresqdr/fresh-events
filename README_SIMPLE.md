# Fresh Events - Simple Deploy

## 🚀 One-Click Deploy

```bash
./deploy.sh
```

That's it! This script:
1. ✅ Installs dependencies
2. ✅ Builds frontend (`npm run build`)
3. ✅ Starts backend on PM2

## 📋 What you need

1. **Node.js** installed
2. **PM2** installed globally:
   ```bash
   npm install -g pm2
   ```
3. **.env** configured with your Odoo credentials

## 💻 Development

Start both frontend + backend:
```bash
npm run dev:full
```

Frontend: http://localhost:5173
Backend: http://localhost:3001

## 📦 Production

```bash
./deploy.sh
```

Frontend served from: `./dist/`
Backend running on PM2

## 🔧 PM2 Commands

```bash
pm2 logs fresh-events        # View logs
pm2 stop fresh-events        # Stop
pm2 restart fresh-events     # Restart
pm2 delete fresh-events      # Remove
pm2 startup                  # Auto-start on reboot
```
