/**
 * Prerender the static page so messengers and Yandex see the copy without executing JS.
 * Uses Vite's SSR build, then deletes dist-ssr. No extra runtime dependency.
 */
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'dist-ssr')

await build({
  root,
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist-ssr',
    emptyOutDir: true,
  },
})

const entry = pathToFileURL(join(outDir, 'entry-server.js')).href
const mod = await import(entry)
const htmlPath = join(root, 'dist/index.html')
const html = readFileSync(htmlPath, 'utf8')
const next = html.replace('<div id="root"></div>', `<div id="root">${mod.render()}</div>`)
if (next === html) throw new Error('prerender: #root placeholder missing')
writeFileSync(htmlPath, next)
rmSync(outDir, { recursive: true, force: true })
console.log('prerender: dist/index.html')
