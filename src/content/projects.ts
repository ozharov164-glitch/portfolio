export type ProjectId = 'fadeline' | 'optbot' | 'deckflow' | 'cozyreset' | 'resumebot'
export type MediaKind = 'phone' | 'desktop' | 'document' | 'poster'
export type ProjectStatus = 'prototype' | 'inactive'

export type ProjectStill = {
  src: string
  alt: string
}

export type Project = {
  id: ProjectId
  tab: string
  number: string
  status: ProjectStatus
  statusLabel: string
  title: string
  oneLiner: string
  flow: string[]
  whatSolved: string
  whatBuilt: string
  ownership: string
  stack: string[]
  poster: string
  posterAlt: string
  mediaKind: MediaKind
  stills?: ProjectStill[]
  localVideo?: string
  youtubeUrl?: string
  githubUrl?: string
  demoUrl?: string
  demoLabel?: string
  siteUrl?: string
  siteLabel?: string
  footnote: string
}

export const projects: Project[] = [
  {
    id: 'fadeline',
    tab: 'FADELINE',
    number: '01',
    status: 'prototype',
    statusLabel: 'Записанный рабочий прототип',
    title: 'Офлайн-микс из своих файлов — внутри Telegram',
    oneLiner:
      'Бот, Mini App, очередь и FFmpeg: человек собирает микс и получает готовый файл в чат.',
    flow: [
      'Telegram-бот',
      'Mini App FADELINE',
      'загрузка и настройки',
      'аудио-воркер',
      'платёжные адаптеры',
      'файл в чат',
    ],
    whatSolved:
      'Собрал один путь без прыжков по сервисам: открыл Mini App, настроил микс или эффект, дождался статуса, забрал файл у бота.',
    whatBuilt:
      'grammY-бот, React Mini App, Fastify API, PostgreSQL-очередь, FFmpeg worker, платежные адаптеры (YooKassa / Stars, live выкл.), VPS-деплой и тесты.',
    ownership: 'Продуктовый flow, frontend, backend, очередь, инфраструктура и деплой.',
    stack: [
      'TypeScript',
      'React',
      'Fastify',
      'grammY',
      'PostgreSQL',
      'FFmpeg',
      'Telegram Mini Apps',
      'Payments',
    ],
    poster: '/media/fadeline/poster.png',
    posterAlt: 'FADELINE Mini App: статус «Готово», файл уже в чате с ботом',
    mediaKind: 'phone',
    stills: [
      { src: '/media/fadeline/poster.png', alt: 'Готовый микс' },
      { src: '/media/fadeline/still-projects.png', alt: 'Список проектов' },
      { src: '/media/fadeline/still-create.png', alt: 'Создание проекта' },
      { src: '/media/fadeline/still-processing.png', alt: 'Обработка' },
      { src: '/media/fadeline/still-detail.png', alt: 'Карточка проекта' },
    ],
    localVideo: '',
    youtubeUrl: 'https://www.youtube.com/shorts/NYJB5FELQic',
    githubUrl: '',
    demoUrl: 'https://t.me/fadeline_bot',
    demoLabel: 'Открыть @fadeline_bot ↗',
    footnote:
      'Рабочий прототип. Платежи в коде есть, live-оплата выключена. Запись — на YouTube.',
  },
  {
    id: 'optbot',
    tab: 'ОптБот',
    number: '02',
    status: 'prototype',
    statusLabel: 'Записанный рабочий прототип',
    title: 'Оптовый заказ из Excel — без ручного переноса позиций',
    oneLiner: 'Каталог → корзина → заявка → PDF-счёт → уведомление менеджеру.',
    flow: [
      'Excel-каталог',
      'Telegram-бот',
      'корзина',
      'заказ',
      'PDF-счёт',
      'пинг менеджеру',
    ],
    whatSolved:
      'Убрал переписывание позиций из переписки в структурированную заявку для менеджера общепита.',
    whatBuilt:
      'Импорт Excel-прайса, каталог и поиск, корзина с мин. партией, оформление, PDF-счёт (кириллица), уведомления, SQLite и сценарий деплоя на VPS.',
    ownership: 'Сценарии бота, бизнес-логика, PDF, тесты, документация и развёртывание.',
    stack: ['Python', 'aiogram', 'SQLite', 'openpyxl', 'fpdf2', 'Telegram Bot API', 'VPS'],
    poster: '/media/optbot/poster.png',
    posterAlt: 'Демо PDF-счёт ОптБота с пометкой «не для оплаты»',
    mediaKind: 'document',
    localVideo: '',
    youtubeUrl: '',
    githubUrl: '',
    footnote:
      'Демо-бот сейчас не крутится на VPS. Сценарий рабочий. YouTube-запись появится здесь, как будет ссылка. Реквизиты на счёте — демо, не клиент.',
  },
  {
    id: 'deckflow',
    tab: 'DeckFlow',
    number: '03',
    status: 'prototype',
    statusLabel: 'Записанный рабочий прототип',
    title: 'Локальный DJ-инструмент на две деки',
    oneLiner: 'Библиотека своих треков, микшер, EQ, sync и MIDI — приложение для Mac.',
    flow: ['Локальная библиотека', 'Дека A / дека B', 'EQ, фильтр, кроссфейдер', 'MIDI и горячие клавиши'],
    whatSolved: 'Собрал рабочий пульт для подготовки и сведения собственных файлов, без стриминга.',
    whatBuilt:
      'Electron-приложение: деки, waveform, BPM, 3-band EQ, кроссфейдер, hot cue, MIDI learn, русские подсказки. Сборка .dmg, без подписи Gatekeeper.',
    ownership: 'Продуктовая логика, UI, аудиодвижок, desktop-интеграция и сборка.',
    stack: ['Electron', 'React', 'TypeScript', 'Web Audio API', 'Zustand', 'Dexie'],
    poster: '/media/deckflow/poster.png',
    posterAlt: 'DeckFlow: две деки, библиотека и микшер',
    mediaKind: 'desktop',
    stills: [
      { src: '/media/deckflow/poster.png', alt: 'Полный интерфейс' },
      { src: '/media/deckflow/still-mixer.png', alt: 'Микшер' },
    ],
    localVideo: '',
    youtubeUrl: '',
    githubUrl: '',
    footnote: 'Локальный macOS-прототип, не публичный сервис. Показ сборки — по запросу.',
  },
  {
    id: 'cozyreset',
    tab: 'ВключиСебя',
    number: '04',
    status: 'inactive',
    statusLabel: 'Неактивен',
    title: 'Экосистема самоподдержки в Telegram',
    oneLiner:
      'Бот как сервисный слой, Mini App «Путь к Себе» как основное пространство: тесты, практики, ИИ-Венера, PDF к специалисту.',
    flow: [
      'Telegram-бот',
      'Mini App «Путь к Себе»',
      'ВключиВнимание',
      'ИИ-Венера',
      'доступ Premium',
      'PDF для специалиста',
    ],
    whatSolved:
      'Собрал спокойный контур самоподдержки внутри Telegram: не «исправить себя за неделю», а маленький шаг, чек-ин и подготовка к живому специалисту.',
    whatBuilt:
      'Бот (доступ, оплата Премиума, поддержка, рефералка, новости), Mini App, ИИ с лимитами, практики, тесты с историей, сборка PDF. Сайт cozyreset.ru.',
    ownership: 'Продуктовая идея, сценарии бота и Mini App, оплата доступа, тексты границ продукта.',
    stack: ['Telegram Bot API', 'Mini Apps', 'AI with limits', 'Payments', 'PDF'],
    poster: '/media/cozyreset/poster.svg',
    posterAlt: 'ВключиСебя / CozyReset: бот, Mini App и ИИ-Венера',
    mediaKind: 'poster',
    localVideo: '',
    youtubeUrl: 'https://www.youtube.com/watch?v=vtnyWM9_l40&t=1s',
    githubUrl: '',
    siteUrl: 'https://cozyreset.ru',
    siteLabel: 'Сайт cozyreset.ru ↗',
    footnote:
      'Проект сейчас неактивен. Это не медицина и не замена психолога. Запись — на YouTube.',
  },
  {
    id: 'resumebot',
    tab: 'Резюме-бот',
    number: '05',
    status: 'inactive',
    statusLabel: 'Неактивен',
    title: 'Сборка резюме из вакансии — в Telegram',
    oneLiner:
      'Человек даёт формулировку работы, бот подбирает навыки и собирает резюме, а не просит заполнить ещё одну анкету с нуля.',
    flow: ['Telegram-бот', 'название работы / вакансия', 'подбор навыков', 'черновик резюме', 'файл на выходе'],
    whatSolved:
      'Убрал ручной подбор скиллов «из головы»: из названия вакансии собирается набор навыков и черновик резюме.',
    whatBuilt:
      'Telegram-бот, подбор навыков (SkillPick), серверная часть и деплой на VPS. Сейчас контур не сопровождается как живой продукт.',
    ownership: 'Сценарий бота, логика подбора навыков, API и деплой.',
    stack: ['Python', 'Telegram Bot API', 'SkillPick', 'VPS'],
    poster: '/media/resumebot/poster.svg',
    posterAlt: 'Схема резюме-бота: вакансия → навыки → документ',
    mediaKind: 'poster',
    localVideo: '',
    youtubeUrl: 'https://www.youtube.com/shorts/-5Z_4betR-8',
    githubUrl: '',
    footnote:
      'Проект сейчас неактивен. Запись — на YouTube. Живой URL и метрики не публикую.',
  },
]

export function getProject(id: ProjectId): Project {
  switch (id) {
    case 'fadeline':
    case 'optbot':
    case 'deckflow':
    case 'cozyreset':
    case 'resumebot': {
      const found = projects.find((item) => item.id === id)
      if (!found) throw new Error(`Missing project data: ${id}`)
      return found
    }
    default: {
      const exhaustive: never = id
      throw new Error(`Unknown project: ${exhaustive}`)
    }
  }
}
