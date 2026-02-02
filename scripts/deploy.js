#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('\n🚀 Fresh Events - Deployment Script\n');
console.log('='.repeat(50));

// Color codes
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    red: '\x1b[31m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function executeCommand(command, description) {
    try {
        log(`\n📍 ${description}...`, 'blue');
        execSync(command, { cwd: rootDir, stdio: 'inherit' });
        log(`✅ ${description} completed`, 'green');
        return true;
    } catch (error) {
        log(`❌ ${description} failed`, 'red');
        console.error(error.message);
        return false;
    }
}

async function deploy() {
    try {
        // Step 1: Check git status
        log('\n📍 Checking git status...', 'blue');
        try {
            const status = execSync('git status --porcelain', { cwd: rootDir, encoding: 'utf8' });
            if (status.trim()) {
                log('⚠️  You have uncommitted changes:', 'yellow');
                console.log(status);
                log('\n💡 Tip: Commit or stash your changes before deploying', 'yellow');
                // Continue anyway for now
            }
        } catch (e) {
            log('⚠️  Git not initialized or not available', 'yellow');
        }

        // Step 2: Pull latest changes
        if (!executeCommand('git pull origin main', 'Pulling latest changes')) {
            log('\n⚠️  Could not pull from git. Continuing with local files...', 'yellow');
        }

        // Step 3: Install dependencies
        if (!executeCommand('npm install', 'Installing dependencies')) {
            throw new Error('Failed to install dependencies');
        }

        // Step 4: Build frontend
        if (!executeCommand('npm run build', 'Building frontend (Vue + Vite)')) {
            throw new Error('Failed to build frontend');
        }

        // Step 5: Create deployment info
        log('\n📍 Creating deployment info...', 'blue');
        const deploymentInfo = {
            deployedAt: new Date().toISOString(),
            version: require(path.join(rootDir, 'package.json')).version,
            node: process.version,
            git: {
                commit: execSync('git rev-parse HEAD', { cwd: rootDir, encoding: 'utf8' }).trim(),
                branch: execSync('git rev-parse --abbrev-ref HEAD', { cwd: rootDir, encoding: 'utf8' }).trim()
            }
        };

        fs.writeFileSync(
            path.join(rootDir, 'dist', 'DEPLOYMENT_INFO.json'),
            JSON.stringify(deploymentInfo, null, 2)
        );
        log('✅ Deployment info created', 'green');

        // Step 6: Summary
        log('\n' + '='.repeat(50), 'bright');
        log('\n✨ Deployment Ready!\n', 'green');
        log('📦 Build output location: ./dist/', 'bright');
        log('🖥️  Backend server file: ./server.js', 'bright');
        log('⚙️  Config file: ./.env', 'bright');

        log('\n📋 Next steps for server deployment:', 'yellow');
        log('1. Upload ./dist/ folder to your web server', 'bright');
        log('2. Upload ./server.js to your backend server', 'bright');
        log('3. Ensure .env is configured on the server', 'bright');
        log('4. Run: npm install', 'bright');
        log('5. Run: npm run server', 'bright');

        log('\n💾 Server startup command:', 'yellow');
        log('npm run server', 'blue');

        log('\n' + '='.repeat(50) + '\n', 'bright');
        log('✅ All steps completed successfully!', 'green');

    } catch (error) {
        log('\n❌ Deployment failed!', 'red');
        console.error(error.message);
        process.exit(1);
    }
}

deploy();
