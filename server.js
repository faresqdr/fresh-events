import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import xmlrpc from 'xmlrpc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Odoo Configuration
const ODOO_URL = process.env.ODOO_URL || 'http://localhost:8069';
const ODOO_DB = process.env.ODOO_DB;
const ODOO_USERNAME = process.env.ODOO_USERNAME;
const ODOO_PASSWORD = process.env.ODOO_PASSWORD;
const ODOO_RPC_PORT = process.env.ODOO_RPC_PORT || 8069;
const ODOO_TEAM_ID = parseInt(process.env.ODOO_TEAM_ID) || 1;

// Create XML-RPC client
const client = xmlrpc.createClient({
    host: ODOO_URL.replace('http://', '').replace('https://', '').split(':')[0],
    port: ODOO_RPC_PORT,
    path: '/xmlrpc/2/object'
});

// Helper function to call Odoo methods
const callOdoo = (method, params) => {
    return new Promise((resolve, reject) => {
        client.methodCall(method, params, (error, value) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        });
    });
};

// Authenticate with Odoo and get UID
const authenticateOdoo = async () => {
    try {
        const authClient = xmlrpc.createClient({
            host: ODOO_URL.replace('http://', '').replace('https://', '').split(':')[0],
            port: ODOO_RPC_PORT,
            path: '/xmlrpc/2/common'
        });

        return new Promise((resolve, reject) => {
            authClient.methodCall('authenticate', [ODOO_DB, ODOO_USERNAME, ODOO_PASSWORD, {}], (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });
    } catch (error) {
        console.error('Odoo authentication error:', error);
        throw error;
    }
};

// Route: Create a lead in Odoo
app.post('/api/create-lead', async (req, res) => {
    try {
        const { name, company, email, phone, message } = req.body;

        // Validate required fields
        if (!name || !email || !company) {
            return res.status(400).json({ error: 'Missing required fields: name, email, company' });
        }

        // Authenticate with Odoo
        const uid = await authenticateOdoo();

        if (!uid) {
            return res.status(401).json({ error: 'Failed to authenticate with Odoo' });
        }

        // Create XML-RPC client
        const queryClient = xmlrpc.createClient({
            host: ODOO_URL.replace('http://', '').replace('https://', '').split(':')[0],
            port: ODOO_RPC_PORT,
            path: '/xmlrpc/2/object'
        });

        // Prepare lead data with team assignment
        const leadData = {
            name: name,
            contact_name: name,
            partner_name: company,
            email_from: email,
            team_id: ODOO_TEAM_ID,  // Assign to team from .env
            description: message || '',
            type: 'opportunity'
        };
        
        // Add phone if provided
        if (phone) {
            leadData.phone = phone;
        }

        // Create lead
        const createClient = xmlrpc.createClient({
            host: ODOO_URL.replace('http://', '').replace('https://', '').split(':')[0],
            port: ODOO_RPC_PORT,
            path: '/xmlrpc/2/object'
        });

        const leadId = await new Promise((resolve, reject) => {
            createClient.methodCall('execute_kw', [ODOO_DB, uid, ODOO_PASSWORD, 'crm.lead', 'create', [leadData]], (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value);
                }
            });
        });

        res.json({
            success: true,
            message: 'Lead created successfully in Odoo',
            leadId: leadId
        });
    } catch (error) {
        console.error('Error creating lead:', error);
        res.status(500).json({ error: 'Failed to create lead in Odoo', details: error.message });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend server is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✅ Fresh Events Backend Server running on port ${PORT}`);
    console.log(`📧 Contact form will submit to: http://localhost:${PORT}/api/create-lead`);
    console.log(`🔗 Odoo instance: ${ODOO_URL}\n`);
});
