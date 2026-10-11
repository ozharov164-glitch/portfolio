import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { isConfigured, site } from './src/content/site.ts'

function pagesBase(): string {
  return process.env.GITHUB_ACTIONS && !isConfigured(site.domain) ? '/portfolio/' : '/'
}

/** Prefix public font URLs when the site is served from /portfolio/. */
function fontBase(): Plugin {
  return {
    name: 'font-base',
    transform(code, id) {
      if (!id.endsWith('.css')) return null
      const base = pagesBase()
      if (base === '/') return null
      return code.replaceAll('url("/fonts/', `url("${base}fonts/`)
    },
  }
}

function socialImage(): Plugin {
  return {
    name: 'social-image',
    transformIndexHtml(html) {
      const host = isConfigured(site.domain)
        ? site.domain.replace(/^https?:\/\//, '').replace(/\/$/, '')
        : ''
      const image = host ? `https://${host}/og-image.png` : '/og-image.png'
      return html.replaceAll('__OG_IMAGE__', image)
    },
  }
}
function warnPlaceholders(): Plugin {
  return {
    name: 'warn-placeholders',
    buildStart() {
      const files = ['src/content/site.ts', 'src/content/projects.ts']
      const found = new Set<string>()
      for (const file of files) {
        const text = readFileSync(join(import.meta.dirname, file), 'utf8')
        for (const match of text.matchAll(/\[\[([A-Z0-9_]+)\]\]/g)) {
          const key = match[1]
          if (key) found.add(key)
        }
      }
      for (const key of found) console.warn(`[placeholders] незаполнен ${key}`)
    },
  }
}

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
  <url>
    <loc>https://${domain}/terms.html</loc>
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
  base: pagesBase(),
  plugins: [react(), fontBase(), warnPlaceholders(), socialImage(), githubPagesDomain()],
})
