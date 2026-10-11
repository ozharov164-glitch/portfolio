# Что заполнить владельцу

Пока ключ не заменён на настоящее значение, связанный блок на сайте скрыт. В собранном HTML плейсхолдеров быть не должно: сборка печатает незаполненные ключи через `console.warn`.

Проверка: значение не должно содержать `[[КЛЮЧ]]`. Так устроен `isConfigured()` в `src/content/site.ts`.

## Сначала

1. `[[YOUTUBE_FADELINE_PUBLIC]]` в `src/content/projects.ts` у кейса FADELINE.
   Видео `https://www.youtube.com/shorts/NYJB5FELQic` сейчас с ограниченным доступом. Переключите его на «Доступ по ссылке» или «Открытый» и вставьте сюда полную ссылку. Пока ключ стоит, кнопки YouTube у FADELINE нет.

2. `[[FADELINE_HIRES_SHOTS]]` — комментарий в `projects.ts`, на сайте не показывается.
   Переснимите экраны FADELINE не ниже 780×1690 (скриншоты iPhone) и положите в `public/media/fadeline/`. Сейчас кадры 226×512, в мокапе они не шире 240px, чтобы не мылиться.

## Когда появятся

3. `[[SHOT_COZYRESET]]` — настоящие скриншоты «ВключиСебя» вместо `public/media/cozyreset/card.svg`.
4. `[[SHOT_RESUMEBOT]]` — настоящие скриншоты резюме-бота вместо `public/media/resumebot/card.svg`.
5. `[[PHOTO_PATH]]` в `src/content/site.ts` — фото владельца, путь вида `/media/brand/photo.webp`. Пока его нет, в блоке «Обо мне» стоит знак `programmer.webp`.
6. `[[GITHUB_PROFILE_URL]]` — ссылка на профиль GitHub, не на репозиторий этого сайта. Пока ключ стоит, ссылка «GitHub» скрыта.
7. `[[REVIEW_1_TEXT]]`, `[[REVIEW_1_AUTHOR]]`, `[[REVIEW_1_CONTEXT]]` — первый отзыв.
8. `[[REVIEW_2_TEXT]]`, `[[REVIEW_2_AUTHOR]]`, `[[REVIEW_2_CONTEXT]]` — второй.
9. `[[REVIEW_3_TEXT]]`, `[[REVIEW_3_AUTHOR]]`, `[[REVIEW_3_CONTEXT]]` — третий.

Секция «Что говорят» и пункт меню появляются только когда заполнены текст и автор хотя бы одного отзыва. Не выдумывайте отзывы.
