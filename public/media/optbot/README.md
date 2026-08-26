# OptBot media

Положите сюда собственные файлы:

- `poster.svg` / `poster.webp` / `poster.jpg` — обложка 16:10 или 16:9
- `demo.webm` — основной короткий ролик
- `demo.mp4` — fallback

Затем в `src/content/projects.ts` у кейса OptBot:

```
poster: '/media/optbot/poster.webp',
localVideo: '/media/optbot/demo.webm',
youtubeUrl: 'https://www.youtube.com/watch?v=...', // только если есть полная запись
```

Перед публикацией ролика уберите из кадра клиентские прайсы, телефоны, адреса и реальные реквизиты.
