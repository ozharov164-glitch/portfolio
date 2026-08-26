# DeckFlow media

Положите сюда собственные файлы:

- `poster.svg` / `poster.webp` / `poster.jpg` — обложка 16:10 или 16:9
- `demo.webm` — основной короткий ролик
- `demo.mp4` — fallback

Затем в `src/content/projects.ts` у кейса DeckFlow:

```
poster: '/media/deckflow/poster.webp',
localVideo: '/media/deckflow/demo.webm',
youtubeUrl: 'https://www.youtube.com/watch?v=...', // только если есть полная запись
```

Если в продукте звучит музыка, в публичный ролик поставьте свой или royalty-free трек.
