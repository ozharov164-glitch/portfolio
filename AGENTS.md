# AGENTS.md

## Learned User Preferences

- This portfolio must stay static and Russian-language.
- Hosting is GitHub Pages (free, public repo) plus custom domain `portfoliodekha.ru`. Registrar is Beget (DNS only). Do not host files on Beget, do not use Beget SSL or «Направить на сайт или VPS», do not use VPS/Nginx as the live host.
- Inactive archive cases: ВключиСебя / CozyReset (`cozyreset.ru`, `@CozyReset_bot`) and ResumeBot. Do not present them as live.
- YouTube demos in `projects.ts` → `youtubeUrl`: FADELINE is `[[YOUTUBE_FADELINE_PUBLIC]]` until `NYJB5FELQic` is public or unlisted-by-link — do not publish the limited URL. ВключиСебя `https://www.youtube.com/watch?v=vtnyWM9_l40&t=1s`, ResumeBot `https://www.youtube.com/shorts/-5Z_4betR-8`. OptBot and LINKTECH are empty — do not invent a link.
- Case order: 01 LINKTECH, 02 FADELINE, 03 ОптБот, 04 DeckFlow, 05 ВключиСебя, 06 Резюме-бот. LINKTECH is a wholesale MacBook Telegram Mini App. Live demo `https://linktech-demo.vercel.app`. Stills in `public/media/linktech/`. Do not present it as a retail storefront or invent the client’s revenue.
- Hire CTA Telegram is `@solevoy19`. Contact email is `dvv.spd@bk.ru`. Name on site: Дмитрий Деханов.
- Legal pages in `public/`: `privacy.html`, `security.html`, `terms.html`. Operator is an individual (физическое лицо); do not invent INN/OGRN/ИП. Site is not a public offer.
- Positioning is generalist: bots, Mini Apps, and sites under a task. FADELINE / OptBot / DeckFlow / Pako are cases, not the brand. Do not shape hero, pitch, or capabilities around wholesale/Excel/invoices.
- «Что я делаю» is three format cards (бот, Mini App, сайт) plus a marquee. Never a «чаты / таблицы / вкладки» pain story and never cart, invoice, or shift icons there.
- Do not place decorative icons that float without a layout slot; icons belong in a step, card, or button. Marks are geometric SVG (`TelegramMark`, play mark), never the old 3D chroma webp.
- The first screen is the hero with a live phone mock. HeroFlow lives in «Как я работаю»: typography-led, no 3D icons. Extra step copy expands on hover (desktop readout) or tap (mobile accordion), never as a popping tooltip. The rail is a packet trace: signal eases node-to-node, progress follows, hover/tap seeks the playhead. No particles. Its title is not «Системный путь».
- Do not invent clients, revenue, reviews, uptime, prices, or legal status. Unknown data is a `[[UPPER_SNAKE_CASE]]` placeholder and stays hidden until filled (`PLACEHOLDERS.md`). `isConfigured()` rejects those tokens. Built HTML must contain zero `[[`.
- Cases are device showcases (phone, laptop, document, or poster), not an `auto + text` shot column. Screenshots show the full frame (`object-fit: contain`). Click opens a lightbox. FADELINE sources are 226×512 — the phone mock stays at most 240px wide until hi-res shots exist. YouTube CTA sits in the case meta row next to the status badge; geometric SVG play mark. Telegram CTA uses `TelegramMark`.
- Mobile navigation is a fullscreen menu. A floating Telegram button appears after the hero on narrow screens. There is no bottom icon dock.
- GitHub remote: `https://github.com/ozharov164-glitch/portfolio` (public). Push only when explicitly asked.
- Do not start a local Vite/dev/preview server, Python http.server, or any other local site server. The machine should not heat up for preview. Check the live GitHub Pages site, not localhost.
- Vite `base` is `/` locally and when `site.domain` is set (`portfoliodekha.ru`). On GitHub Actions without a domain it is `/portfolio/` so Pages works at `https://ozharov164-glitch.github.io/portfolio/`.
- Beget menu for this domain: only «Редактировать DNS». Skip «Сертификат на домен», AuthInfo-code, and domain transfer. GitHub Pages custom domain is set via repo Settings/API (`cname: portfoliodekha.ru`); the Actions workflow ignores the CNAME file for binding. HTTPS Enforce cannot be enabled until GitHub issues the certificate.

## Learned Workspace Facts

- Workspace folder name has a trailing space: `/Users/dmitriidekhanov/портфолио `.
- Visual system: Signal on the Proof Console palette. Ink `#07090D`, surfaces `#10151D` / `#151C26`, text `#EDF5FF`, muted `#9AA8BB`, signal green `#35E2A1`, Telegram blue `#2AABEE`. Direction is a light trace from blue to green, Unbounded headlines, realistic CSS devices. No Tailwind, Framer, GSAP, or UI kits. Animation is CSS, WAAPI, or rAF, and only `transform` / `opacity`.
- Fonts are self-hosted in `public/fonts/` (Unbounded, Onest, JetBrains Mono, latin + cyrillic, sliced variable woff2, OFL). Load them through `publicUrl()` the same way as media. CSS `url("/fonts/...")` is rewritten for the `/portfolio/` base by the `fontBase` plugin.
- CSS variables that change by breakpoint must be set on `:root`, not `html` — `:root` wins on specificity, so mobile `--header-h` / `--brand-mark` overrides were silently ignored.
- Public files under `public/` must be loaded via `publicUrl()` in `src/lib/publicUrl.ts`. Vite does not rewrite root-absolute `/media/...` or `/fonts/...` strings in JS, so GitHub Pages (`base: /portfolio/`) otherwise 404s them.
- Site copy and links live in `src/content/site.ts` and `src/content/projects.ts`.
- Case media belongs in `public/media/<project>/`; videos are added later by the owner.
- Static legal pages: `public/privacy.html`, `public/security.html`, `public/terms.html`. Site URL `https://portfoliodekha.ru`. Hosting named there as GitHub Pages; Beget is registrar only. Operator contact: `dvv.spd@bk.ru`.
- Header brand mark is the AI-generated contour (`public/media/brand/programmer.webp`): crop tight to the figure, scale with `clamp` so it stays readable on fullscreen desktop. Do not replace it with a hand-drawn SVG.
- Background atmosphere stays behind `main` (`z-index: 0` vs content `1`): two soft aurora blobs and a grain tile. No rain, typewriter, or scanline. It must not compete with copy. Respect `prefers-reduced-motion`.
- Case fields are `task`, `solution`, `result`, and `built`. Statuses: «Живое демо», «Рабочий прототип», «Приложение для Mac», «Архив». Do not use «Неактивен» or «Записанный рабочий прототип».
- The page is prerendered (`scripts/prerender.mjs`). Do not read `window` during render. Social image is `public/og-image.png`, rasterized by `npm run og` from `public/og.svg`.
