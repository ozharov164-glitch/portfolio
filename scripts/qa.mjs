import { mkdir, readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { dirname, extname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const shots = join(root, 'qa')

const viewports = [
  { name: '1440', width: 1440, height: 900, mobile: false },
  { name: '1280', width: 1280, height: 800, mobile: false },
  { name: '390x750', width: 390, height: 750, mobile: true },
  { name: '390x844', width: 390, height: 844, mobile: true },
  { name: '360', width: 360, height: 740, mobile: true },
]

const failures = []

function fail(message) {
  failures.push(message)
  console.error('FAIL', message)
}

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
}

function serveDist() {
  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://127.0.0.1').pathname)
    const file = join(dist, pathname === '/' ? 'index.html' : pathname.replace(/^\//, ''))
    try {
      const body = await readFile(file)
      res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
      res.end(body)
    } catch {
      res.writeHead(404)
      res.end('missing')
    }
  })
  return new Promise((resolvePromise) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : 0
      resolvePromise({ server, url: `http://127.0.0.1:${port}/` })
    })
  })
}

async function pageUrl() {
  if (process.env.QA_URL) return { url: process.env.QA_URL, close() {} }
  const served = await serveDist()
  return { url: served.url, close: () => served.server.close() }
}

async function shot(page, name) {
  await page.screenshot({ path: join(shots, `${name}.png`), fullPage: false })
}

const browser = await chromium.launch()
const opened = await pageUrl()
const url = opened.url
await mkdir(shots, { recursive: true })

for (const viewport of viewports) {
  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
    hasTouch: viewport.mobile,
    isMobile: viewport.mobile,
    userAgent: viewport.mobile
      ? 'Mozilla/5.0 (Linux; Android 13; Telegram) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36'
      : undefined,
  })
  const errors = []
  page.on('pageerror', (error) => errors.push(String(error)))
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text())
  })
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)

  const global = await page.evaluate(() => {
    const overflowing = [...document.body.querySelectorAll('*')].filter((node) => {
      if (!(node instanceof HTMLElement)) return false
      const rect = node.getBoundingClientRect()
      if (rect.width < 2 || rect.height < 2) return false
      if (rect.right <= window.innerWidth + 1) return false
      let parent = node.parentElement
      while (parent) {
        const overflow = getComputedStyle(parent).overflowX
        if (overflow === 'hidden' || overflow === 'clip' || overflow === 'auto' || overflow === 'scroll') return false
        parent = parent.parentElement
      }
      return true
    }).length
    const tiny = [...document.body.querySelectorAll('body *')].filter((node) => {
      if (!(node instanceof HTMLElement)) return false
      if (node.classList.contains('sr-only')) return false
      const size = Number.parseFloat(getComputedStyle(node).fontSize)
      return size > 0 && size < 12 && node.innerText.trim().length > 0
    }).length
    return {
      scroll: document.documentElement.scrollWidth === window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      inner: window.innerWidth,
      brackets: document.documentElement.innerHTML.includes('[['),
      overflowing,
      tiny,
    }
  })

  if (!global.scroll) fail(`${viewport.name}: scrollWidth ${global.scrollWidth} != ${global.inner}`)
  if (global.brackets) fail(`${viewport.name}: placeholder brackets in HTML`)
  if (global.overflowing > 8) fail(`${viewport.name}: ${global.overflowing} elements stick out`)
  if (global.tiny > 0) fail(`${viewport.name}: ${global.tiny} text nodes under 12px`)
  if (errors.length) fail(`${viewport.name}: console ${errors[0]}`)

  await shot(page, `${viewport.name}-hero`)

  if (!viewport.mobile) {
    await page.hover('.signal-nodes button')
    await page.waitForTimeout(1000)
    await shot(page, `${viewport.name}-process`)
  } else {
    await page.locator('#process').scrollIntoViewIfNeeded()
    await page.locator('.stepper__hit').nth(1).click()
    await page.locator('.stepper__hit').nth(1).click()
    const open = await page.locator('.stepper__item.is-open').count()
    if (open !== 1) fail(`${viewport.name}: stepper open count ${open}`)
    await shot(page, `${viewport.name}-process`)
  }

  await page.screenshot({ path: join(shots, `${viewport.name}-top.png`) })
  await page.close()
}

await browser.close()
opened.close()

if (failures.length) {
  console.error(`\n${failures.length} failed`)
  process.exit(1)
}

console.log('qa ok')
