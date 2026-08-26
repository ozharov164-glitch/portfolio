# AGENTS.md

## Learned User Preferences

- This portfolio must stay static and Russian-language.
- Hosting is GitHub Pages (free, public repo) plus a purchased custom domain. Do not use VPS/Nginx as the live host.
- Inactive archive cases: ВключиСебя / CozyReset (`cozyreset.ru`, `@CozyReset_bot`) and ResumeBot. Do not present them as live.
- YouTube demos in `projects.ts` → `youtubeUrl`: FADELINE `https://www.youtube.com/shorts/NYJB5FELQic`, ВключиСебя `https://www.youtube.com/watch?v=vtnyWM9_l40&t=1s`, ResumeBot `https://www.youtube.com/shorts/-5Z_4betR-8`. OptBot still empty — do not invent a link.
- Hire CTA Telegram is `@solevoy19`. Contact email is `dvv.spd@bk.ru`. Name on site: Дмитрий Деханов.
- Legal pages in `public/`: `privacy.html`, `security.html`, `terms.html`. Operator is an individual (физическое лицо); do not invent INN/OGRN/ИП. Site is not a public offer.
- Positioning is generalist: bots, Mini Apps, and sites under a task. FADELINE / OptBot / DeckFlow / Pako are cases, not the brand. Do not shape hero, pitch, or capabilities around wholesale/Excel/invoices.
- Pitch band is two offering cards (bots/Mini App vs sites), never a «чаты / таблицы / вкладки» pain story and never cart, invoice, or shift icons there.
- Do not place decorative icons that float without a layout slot; icons belong in a step, card, or button.
- HeroFlow «Системный путь» is typography-led: no 3D icons. Extra step copy expands on hover (desktop readout) or tap (mobile accordion), never as a popping tooltip.
- Do not invent clients, revenue, reviews, or uptime. Keep placeholders instead of guessing contacts.
- Case screenshots: show the full frame (`object-fit: contain`), no extra inner stage box. Case grid is `auto + text`, so the media column is only as wide as the shot. Click opens a lightbox; hint is a caption under the shot. FADELINE sources are 226×512 — display near native.
- GitHub remote: `https://github.com/ozharov164-glitch/portfolio` (public). Push only when explicitly asked.
- Do not start a local Vite/dev/preview server. Check the live GitHub Pages site, not localhost.
- Vite `base` is `/` locally (and with a custom domain). On GitHub Actions without `site.domain` it is `/portfolio/` so Pages works at `https://ozharov164-glitch.github.io/portfolio/`.

## Learned Workspace Facts

- Workspace folder name has a trailing space: `/Users/dmitriidekhanov/портфолио `.
- Visual system: Proof Console. Background `#090B0F`, surfaces `#10151D` / `#151C26`, text `#EDF5FF`, muted `#8B9AAF`, signal green `#35E2A1`, Telegram blue `#2AABEE`.
- Public files under `public/` must be loaded via `publicUrl()` in `src/lib/publicUrl.ts`. Vite does not rewrite root-absolute `/media/...` strings, so GitHub Pages (`base: /portfolio/`) otherwise 404s icons, posters, and the aurora texture.
- Site copy and links live in `src/content/site.ts` and `src/content/projects.ts`.
- Case media belongs in `public/media/<project>/`; videos are added later by the owner.
- Static legal pages: `public/privacy.html`, `public/security.html`, `public/terms.html`. Hosting named there as GitHub Pages. Operator contact: `dvv.spd@bk.ru`.
- Header brand mark is the AI-generated contour (`public/media/brand/programmer.webp`): crop tight to the figure, scale with `clamp` so it stays readable on fullscreen desktop. Do not replace it with a hand-drawn SVG.
