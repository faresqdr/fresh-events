# 🎯 Fresh Events - Setup Summary

Vous avez un système complet de développement et déploiement! Voici ce qui a été créé:

## 📦 **Installation**

```bash
npm install
```

## 🚀 **Démarrage (Développement)**

### ✨ Tout en un (Frontend + Backend)
```bash
npm run dev:full
```

ou avec Make:
```bash
make dev-full
```

**Accès:**
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Séparé
```bash
npm run dev          # Frontend seul
npm run server       # Backend seul
```

## 🏗️ **Build & Déploiement**

### Préparer le déploiement (1 clic)
```bash
npm run deploy
```
ou
```bash
make deploy
```

Cela fait automatiquement:
- ✅ Pull les derniers changements (git)
- ✅ Installe les dépendances
- ✅ Build le frontend Vue.js
- ✅ Vérifie la configuration

### Envoyer sur le serveur (1 clic)
```bash
make deploy-server SERVER=user@votreserveur.com PATH=/var/www/fresh-events
```

ou
```bash
./scripts/deploy-server.sh user@votreserveur.com /var/www/fresh-events
```

## 📂 **Fichiers créés**

### Scripts
- `scripts/deploy.js` - Prépare le déploiement (build, install, pull)
- `scripts/deploy-server.sh` - Upload sur le serveur via SFTP
- `scripts/start-dev.sh` - Lance frontend + backend

### Configuration
- `Makefile` - Commandes rapides (make dev-full, make deploy, etc.)
- `docker-compose.yml` - Lancer avec Docker
- `Dockerfile.frontend` - Image Docker frontend
- `Dockerfile.backend` - Image Docker backend

### Documentation
- `START_HERE.md` - Guide de démarrage rapide
- `DEPLOYMENT_GUIDE.md` - Guide complet de déploiement
- `ODOO_SETUP.md` - Configuration Odoo détaillée
- `ODOO_QUICK_START.md` - Quick start Odoo

### Configuration
- `.env` - Vos variables (Odoo, serveur, etc.)
- `.env.example` - Template (pour git)
- `.gitignore` - Exclut .env des commits

## 🎮 **Commandes Make Disponibles**

```bash
make help              # Voir toutes les commandes
make dev              # Frontend seul
make dev-full         # Frontend + Backend
make server           # Backend seul
make build            # Build le frontend
make deploy           # Prépare le déploiement
make deploy-server    # Envoie sur le serveur
make clean            # Nettoie (dist, node_modules)
make install          # Installe les dépendances
make status           # Montre le statut du projet
```

## 🐳 **Avec Docker**

```bash
docker-compose up
```

Lance automatically:
- Frontend sur :5173
- Backend sur :3001

## ⚡ **Workflow Complet (Développement)**

```bash
# 1. Installation
npm install

# 2. Config
cp .env.example .env
# Éditer .env avec vos infos Odoo

# 3. Développement
npm run dev:full

# 4. Coder et tester
# → http://localhost:5173
# → Formulaire envoie à http://localhost:3001/api/create-lead
```

## 📤 **Workflow Complet (Production)**

```bash
# 1. Préparer localement
npm run deploy

# 2. Envoyer au serveur
make deploy-server SERVER=user@host PATH=/app/path

# 3. Sur le serveur
ssh user@host
cd /app/path
npm run server

# 4. Accéder
# http://votreserveur.com
```

## 🔐 **Sécurité**

- ✅ `.env` est ignoré dans git (contient les passwords)
- ✅ `node_modules` n'est pas uploadé
- ✅ `.env.example` sert de template
- ✅ Configuration serveur séparée de la source

## 🎯 **Prochaines étapes**

1. **Configuration Odoo**: Éditer `.env`
2. **Développement**: `npm run dev:full`
3. **Tests**: Remplir le formulaire et vérifier Odoo
4. **Build**: `npm run deploy`
5. **Production**: `make deploy-server SERVER=... PATH=...`

## 📚 **Documentation Complète**

- [START_HERE.md](START_HERE.md) - Pour commencer
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Guide détaillé
- [ODOO_SETUP.md](ODOO_SETUP.md) - Intégration Odoo
- [ODOO_QUICK_START.md](ODOO_QUICK_START.md) - Quick start Odoo

---

**C'est tout! Vous avez un système professionnel de développement et déploiement! 🎉**

`npm run dev:full` pour commencer! 🚀
