import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    // Le catalogue et le configurateur de devis appellent l'API Odoo sur
    // /fresh-events/* — en prod c'est nginx qui proxifie, en dev c'est ici.
    proxy: {
      '/fresh-events': {
        target: 'http://127.0.0.1:8069',
        changeOrigin: true,
      },
    },
    headers: {
      'X-UA-Compatible': 'IE=edge',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    }
  }
})
