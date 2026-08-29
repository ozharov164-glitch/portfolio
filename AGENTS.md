# AGENTS.md

## Learned User Preferences

- This portfolio must stay static and Russian-language.
- Hosting is GitHub Pages (free, public repo) plus custom domain `portfoliodekha.ru`. Registrar is Beget (DNS only). Do not host files on Beget, do not use Beget SSL or «Направить на сайт или VPS», do not use VPS/Nginx as the live host.
- Inactive archive cases: ВключиСебя / CozyReset (`cozyreset.ru`, `@CozyReset_bot`) and ResumeBot. Do not present them as live.
- YouTube demos in `projects.ts` → `youtubeUrl`: FADELINE `https://www.youtube.com/shorts/NYJB5FELQic`, ВключиСебя `https://www.youtube.com/watch?v=vtnyWM9_l40&t=1s`, ResumeBot `https://www.youtube.com/shorts/-5Z_4betR-8`. OptBot still empty — do not invent a link.
- Hire CTA Telegram is `@solevoy19`. Contact email is `dvv.spd@bk.ru`. Name on site: Дмитрий Деханов.
- Legal pages in `public/`: `privacy.html`, `security.html`, `terms.html`. Operator is an individual (физическое лицо); do not invent INN/OGRN/ИП. Site is not a public offer.
- Positioning is generalist: bots, Mini Apps, and sites under a task. FADELINE / OptBot / DeckFlow / Pako are cases, not the brand. Do not shape hero, pitch, or capabilities around wholesale/Excel/invoices.
- Pitch band is two offering cards (bots/Mini App vs sites), never a «чаты / таблицы / вкладки» pain story and never cart, invoice, or shift icons there.
- Do not place decorative icons that float without a layout slot; icons belong in a step, card, or button. Section marks are geometric SVG (`LineIcon`), never the old 3D chroma webp.
- HeroFlow «Системный путь» is typography-led: no 3D icons. Extra step copy expands on hover (desktop readout) or tap (mobile accordion), never as a popping tooltip. The rail is a packet trace: signal eases node-to-node, progress stroke follows, hover/tap seeks the playhead. No particles.
- Do not invent clients, revenue, reviews, or uptime. Keep placeholders instead of guessing contacts.
- Case screenshots: show the full frame (`object-fit: contain`), no extra inner stage box. Case grid is `auto + text`, so the media column is only as wide as the shot. Click opens a lightbox; hint is a caption under the shot. FADELINE sources are 226×512 — display near native. YouTube CTA sits in the case meta row next to the prototype badge (not above the shot, not in the footer action row); use a geometric SVG play mark, never an AI-generated 3D/glass button. Telegram CTA uses a geometric SVG paper plane (`TelegramMark`), never the 3D webp, so the mark stays sharp and optically centered in the pill.
- GitHub remote: `https://github.com/ozharov164-glitch/portfolio` (public). Push only when explicitly asked.
- Do not start a local Vite/dev/preview server, Python http.server, or any other local site server. The machine should not heat up for preview. Check the live GitHub Pages site, not localhost.
- Vite `base` is `/` locally and when `site.domain` is set (`portfoliodekha.ru`). On GitHub Actions without a domain it is `/portfolio/` so Pages works at `https://ozharov164-glitch.github.io/portfolio/`.
- Beget menu for this domain: only «Редактировать DNS». Skip «Сертификат на домен», AuthInfo-code, and domain transfer. GitHub Pages custom domain is set via repo Settings/API (`cname: portfoliodekha.ru`); the Actions workflow ignores the CNAME file for binding. HTTPS Enforce cannot be enabled until GitHub issues the certificate.

## Learned Workspace Facts

- Workspace folder name has a trailing space: `/Users/dmitriidekhanov/портфолио `.
- Visual system: Proof Console. Background `#090B0F`, surfaces `#10151D` / `#151C26`, text `#EDF5FF`, muted `#9AA8BB`, signal green `#35E2A1`, Telegram blue `#2AABEE`.
- CSS variables that change by breakpoint must be set on `:root`, not `html` — `:root` wins on specificity, so mobile `--header-h` / `--brand-mark` overrides were silently ignored.
- Public files under `public/` must be loaded via `publicUrl()` in `src/lib/publicUrl.ts`. Vite does not rewrite root-absolute `/media/...` strings, so GitHub Pages (`base: /portfolio/`) otherwise 404s icons, posters, and the aurora texture.
- Site copy and links live in `src/content/site.ts` and `src/content/projects.ts`.
- Case media belongs in `public/media/<project>/`; videos are added later by the owner.
- Static legal pages: `public/privacy.html`, `public/security.html`, `public/terms.html`. Site URL `https://portfoliodekha.ru`. Hosting named there as GitHub Pages; Beget is registrar only. Operator contact: `dvv.spd@bk.ru`.
- Header brand mark is the AI-generated contour (`public/media/brand/programmer.webp`): crop tight to the figure, scale with `clamp` so it stays readable on fullscreen desktop. Do not replace it with a hand-drawn SVG.
- Background atmosphere stays behind `main` (`z-index: 0` vs content `1`): quiet edge rain, faint typewriter, scanline. Never compete with copy. On mobile keep both rains, scan, and blobs visible at the edges; hide only the typewriter. Soften the vignette so edge motion is not eaten. Respect `prefers-reduced-motion`.
