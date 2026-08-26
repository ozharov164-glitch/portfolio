# MixFlow media

Положите сюда собственные файлы:

- `poster.svg` / `poster.webp` / `poster.jpg` — обложка 16:10 или 16:9
- `demo.webm` — основной короткий ролик
- `demo.mp4` — fallback

Затем в `src/content/projects.ts` у кейса MixFlow:

```
poster: '/media/mixflow/poster.webp',
localVideo: '/media/mixflow/demo.webm',
youtubeUrl: 'https://www.youtube.com/watch?v=...', // только если есть полная запись
```

Не кладите `.env`, токены, IP, пароли, чужие персональные данные и музыку без прав.
