/**
 * Rasterize public/og.svg and public/favicon.svg.
 * @resvg/resvg-js is a devDependency for this script only.
 * Variable woff2 is instanced to static TTF first — resvg does not draw those woff2 files.
 */
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Resvg } from '@resvg/resvg-js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fontDir = mkdtempSync(join(tmpdir(), 'og-fonts-'))

const baked = spawnSync(
  'python3',
  [
    '-c',
    `
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from pathlib import Path
root = Path(${JSON.stringify(root)})
out = Path(${JSON.stringify(fontDir)})
jobs = [
    ("unbounded-cyrillic.woff2", 650, "ub-c.ttf"),
    ("unbounded-latin.woff2", 650, "ub-l.ttf"),
    ("onest-cyrillic.woff2", 480, "on-c.ttf"),
    ("onest-latin.woff2", 480, "on-l.ttf"),
]
for src, wght, name in jobs:
    font = TTFont(root / "public/fonts" / src)
    instantiateVariableFont(font, {"wght": wght}, inplace=True, overlap=True)
    font.flavor = None
    font.save(out / name)
`,
  ],
  { stdio: 'inherit' },
)

if (baked.status !== 0) {
  rmSync(fontDir, { recursive: true, force: true })
  process.exit(baked.status ?? 1)
}

const fonts = ['ub-c.ttf', 'ub-l.ttf', 'on-c.ttf', 'on-l.ttf'].map((name) => join(fontDir, name))

function raster(svgName, pngName, width) {
  const svg = readFileSync(join(root, 'public', svgName), 'utf8')
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: width },
    font: { fontFiles: fonts, loadSystemFonts: false, defaultFontFamily: 'Onest' },
  })
  const png = resvg.render().asPng()
  writeFileSync(join(root, 'public', pngName), png)
  console.log(pngName, png.length)
}

raster('og.svg', 'og-image.png', 1200)
raster('favicon.svg', 'favicon-32.png', 32)
raster('favicon.svg', 'favicon-48.png', 48)
raster('favicon.svg', 'apple-touch-icon.png', 180)
rmSync(fontDir, { recursive: true, force: true })
