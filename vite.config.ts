import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { isConfigured, site } from './src/content/site.ts'

function githubPagesDomain(): Plugin {
  return {
    name: 'github-pages-domain',
    closeBundle() {
      if (!isConfigured(site.domain)) return
      const domain = site.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
      const dist = join(import.meta.dirname, 'dist')
      writeFileSync(join(dist, 'CNAME'), `${domain}\n`)
      writeFileSync(
        join(dist, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: https://${domain}/sitemap.xml\n`,
      )
      writeFileSync(
        join(dist, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://${domain}/</loc>
  </url>
  <url>
    <loc>https://${domain}/privacy.html</loc>
  </url>
  <url>
    <loc>https://${domain}/security.html</loc>
  </url>
</urlset>
`,
      )
    },
  }
}

export default defineConfig({
  // Local and custom-domain root stay `/`. On GitHub Actions without a domain
  // the site is served from /portfolio/.
  base: process.env.GITHUB_ACTIONS && !isConfigured(site.domain) ? '/portfolio/' : '/',
  plugins: [react(), githubPagesDomain()],
})
