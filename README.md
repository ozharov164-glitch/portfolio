# Портфолио Telegram Product Developer

Статический сайт. Хостинг — бесплатный GitHub Pages. Адрес в браузере — ваш купленный домен.

## Запуск на компьютере

```bash
npm install
npm run dev
```

Откройте адрес, который покажет Vite (обычно `http://localhost:5173`).

Сборка:

```bash
npm run build
npm run preview
```

## Как будет жить сайт в интернете

Репозиторий: [github.com/ozharov164-glitch/portfolio](https://github.com/ozharov164-glitch/portfolio). Он **публичный** — так работает бесплатный GitHub Pages.

1. При каждом обновлении ветки `main` GitHub сам собирает сайт и выкладывает его.
2. Пока свой домен не подключен, сайт открывается так: `https://ozharov164-glitch.github.io/portfolio/`.
3. Купленный домен направляется на GitHub. Замочек HTTPS GitHub включает сам.

Когда домен появится — напишите его в чат. Нужно прописать его в `src/content/site.ts` (`domain`) и в GitHub: **Settings → Pages → Custom domain**.

DNS-записи для регистратора лежат в `deploy/dns.txt`.

## Где заменить placeholders

Личные данные — только в контенте, не в компонентах:

- `src/content/site.ts`: `[[NAME]]`, `[[TELEGRAM_URL]]`, `[[TELEGRAM_HANDLE]]`, `[[EMAIL]]`, `[[GITHUB_URL]]`, `[[TIMEZONE]]`, `[[DOMAIN]]`, `[[YEAR]]`
- `index.html`: title / description / Open Graph
- `public/robots.txt` и `public/sitemap.xml`: подставятся из `[[DOMAIN]]` при сборке, когда домен заполнен
- `public/privacy.html` и `public/security.html`: `[[OPERATOR_FULL_NAME]]`, `[[OPERATOR_CONTACT_EMAIL]]`, `[[POLICY_EFFECTIVE_DATE]]`

Пока GitHub-ссылка остаётся placeholder, пункт GitHub в подвале скрыт. Пустые `youtubeUrl` / `localVideo` / `githubUrl` в кейсах тоже скрывают соответствующие кнопки.

## Как добавить видео и постеры

Реальные MP4/WebM в репозиторий не входят. Положите свои файлы в:

- `public/media/mixflow/`
- `public/media/optbot/`
- `public/media/deckflow/`

Имена по умолчанию: `demo.webm` + fallback `demo.mp4`, постер `poster.webp` или замена текущего `poster.svg`.

Путь пропишите в `src/content/projects.ts`. Подробности — в `public/media/*/README.md`.

Рекомендуемое сжатие своих роликов (запускайте сами, когда файлы готовы):

```bash
ffmpeg -i source.mov -vf "scale='min(1600,iw)':-2" -c:v libvpx-vp9 -b:v 1.2M -an demo.webm
ffmpeg -i source.mov -vf "scale='min(1600,iw)':-2" -c:v libx264 -crf 28 -preset medium -an demo.mp4
```

## Проверка перед публикацией медиа

- нет token / API key / `.env`
- нет IP VPS, паролей, реальных платёжных реквизитов
- нет чужих клиентских и персональных данных
- есть права на музыку, видео, логотипы и изображения
- если в продукте используется музыка, в публичный ролик поставить свой или royalty-free трек

Перед добавлением форм, платежей, аналитики или персональных данных обновите `privacy.html` / `security.html` и отдельно проверьте юридические требования.

## Стек

Vite + React + TypeScript. Стили — `src/styles/globals.css`. Без Tailwind, UI-kit, аналитики, форм и внешних CDN. Хостинг: GitHub Pages + свой домен.
