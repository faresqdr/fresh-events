#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { routeDefs as routes } from '../src/router/routes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(__dirname, '..')

const SITE_URL = 'https://fresh-events.fr'
const PRIORITY_BY_PATH = {
  '/': '1.0',
  '/devis': '0.9',
}

const today = new Date().toISOString().slice(0, 10)

const urls = routes.map((route) => {
  const priority = PRIORITY_BY_PATH[route.path] || '0.8'
  return `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
}).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

for (const dir of ['public', 'dist']) {
  const target = path.join(rootDir, dir)
  if (fs.existsSync(target)) {
    fs.writeFileSync(path.join(target, 'sitemap.xml'), sitemap)
    console.log(`✅ sitemap.xml written to ${dir}/`)
  }
}
