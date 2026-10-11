import { tyDeep } from '../lib/typograph.ts'

export type ProjectId = 'linktech' | 'fadeline' | 'optbot' | 'deckflow' | 'cozyreset' | 'resumebot'
export type MediaKind = 'phone' | 'desktop' | 'document' | 'poster'
export type ProjectStatus = 'live' | 'prototype' | 'mac' | 'archive'

export type ProjectStill = {
  src: string
  alt: string
  width: number
  height: number
}

export type Project = {
  id: ProjectId
  tab: string
  number: string
  status: ProjectStatus
  statusLabel: string
  title: string
  task: string
  solution: string
  result: string
  flow: string[]
  built: string
  ownership: string
  stack: string[]
  poster: string
  posterAlt: string
  posterWidth: number
  posterHeight: number
  mediaKind: MediaKind
  /** Low-resolution phone shots: keep the frame near 240 CSS px. */
  lofi?: boolean
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

const rawProjects: Project[] = [
  {
    id: 'linktech',
    tab: 'LINKTECH',
    number: '01',
    status: 'live',
    statusLabel: 'Живое демо',
    title: 'Оптовый каталог MacBook прямо в Telegram',
    task: 'Оптовикам неудобно выбирать партию MacBook по прайсу в переписке.',
    solution: 'Mini App с каталогом из прайса, фильтрами, карточкой конфигурации и корзиной от 5 штук.',
    result:
      'Клиент собирает партию на одном экране — модель, память, грейд, цена в у.е. и рублях, остаток — и отправляет заявку менеджеру. Работает в Telegram и в браузере.',
    flow: ['Прайс', 'Каталог и фильтры', 'Карточка конфигурации', 'Корзина от 5 шт.', 'Заявка менеджеру'],
    built:
      'Telegram Mini App: каталог из прайса, фильтры, карточка конфигурации, корзина с минимальной партией и заявка. Открывается в Telegram и в обычном браузере.',
    ownership: 'Экран, логика каталога и корзины, заявка и выкладка демо.',
    stack: ['TypeScript', 'React', 'Telegram Mini Apps', 'Vercel'],
    poster: '/media/linktech/poster.webp',
    posterAlt: 'LINKTECH: каталог MacBook, поиск и цены в у.е. и рублях',
    posterWidth: 780,
    posterHeight: 1400,
    mediaKind: 'phone',
    stills: [
      { src: '/media/linktech/poster.webp', alt: 'Каталог', width: 780, height: 1400 },
      { src: '/media/linktech/still-product.webp', alt: 'Карточка модели', width: 780, height: 1400 },
      { src: '/media/linktech/still-cart.webp', alt: 'Корзина', width: 780, height: 1400 },
    ],
    localVideo: '',
    youtubeUrl: '',
    githubUrl: '',
    demoUrl: 'https://linktech-demo.vercel.app',
    demoLabel: 'Открыть демо ↗',
    footnote: 'Живое демо. Цены и остатки берутся из прайса. Оплата на сайте не принимается — заявка уходит менеджеру.',
  },
  {
    id: 'fadeline',
    tab: 'FADELINE',
    number: '02',
    status: 'prototype',
    statusLabel: 'Рабочий прототип',
    title: 'Офлайн-микс из своих файлов — внутри Telegram',
    task: 'Собрать микс из своих треков, не прыгая между сервисами.',
    solution: 'Бот и Mini App, очередь на сервере и обработка через FFmpeg.',
    result: 'Пользователь настраивает микс в Mini App, видит статус и получает готовый файл прямо в чат.',
    flow: [
      'Telegram-бот',
      'Mini App FADELINE',
      'Загрузка и настройки',
      'Аудио-воркер',
      'Платёжные адаптеры',
      'Файл в чат',
    ],
    built:
      'grammY-бот, React Mini App, Fastify API, PostgreSQL-очередь, FFmpeg-воркер, платёжные адаптеры (ЮKassa / Stars, приём платежей выключен), запуск на VPS и тесты.',
    ownership: 'Продуктовый сценарий, интерфейс, сервер, очередь, инфраструктура и запуск.',
    stack: ['TypeScript', 'React', 'Fastify', 'grammY', 'PostgreSQL', 'FFmpeg', 'Telegram Mini Apps', 'Платежи'],
    poster: '/media/fadeline/poster.webp',
    posterAlt: 'FADELINE Mini App: статус «Готово», файл уже в чате с ботом',
    posterWidth: 226,
    posterHeight: 512,
    mediaKind: 'phone',
    // [[FADELINE_HIRES_SHOTS]] Переснять экраны не ниже 780×1690 и положить в public/media/fadeline/
    lofi: true,
    stills: [
      { src: '/media/fadeline/poster.webp', alt: 'Готовый микс', width: 226, height: 512 },
      { src: '/media/fadeline/still-projects.webp', alt: 'Список проектов', width: 226, height: 512 },
      { src: '/media/fadeline/still-create.webp', alt: 'Создание проекта', width: 226, height: 512 },
      { src: '/media/fadeline/still-processing.webp', alt: 'Обработка', width: 226, height: 512 },
      { src: '/media/fadeline/still-detail.webp', alt: 'Карточка проекта', width: 226, height: 512 },
    ],
    localVideo: '',
    // Владелец: переключите видео на «Доступ по ссылке» или «Открытый» и верните ссылку.
    youtubeUrl: '[[YOUTUBE_FADELINE_PUBLIC]]',
    githubUrl: '',
    demoUrl: 'https://t.me/fadeline_bot',
    demoLabel: 'Открыть демо ↗',
    footnote: 'Оплата через ЮKassa и Telegram Stars подготовлена, в демо выключена.',
  },
  {
    id: 'optbot',
    tab: 'ОптБот',
    number: '03',
    status: 'prototype',
    statusLabel: 'Рабочий прототип',
    title: 'Оптовый заказ из Excel — без ручного переноса позиций',
    task: 'Менеджер общепита вручную переносит позиции заказа из переписки.',
    solution: 'Бот с каталогом из Excel-прайса, поиском и корзиной с минимальной партией.',
    result: 'Вместо ручного переноса позиций менеджер получает готовую заявку и PDF-счёт.',
    flow: ['Excel-каталог', 'Telegram-бот', 'Корзина', 'Заказ', 'PDF-счёт', 'Уведомление менеджеру'],
    built:
      'Импорт Excel-прайса, каталог и поиск, корзина с мин. партией, оформление, PDF-счёт (кириллица), уведомления, SQLite и сценарий деплоя на VPS.',
    ownership: 'Сценарии бота, бизнес-логика, PDF, тесты, документация и развёртывание.',
    stack: ['Python', 'aiogram', 'SQLite', 'openpyxl', 'fpdf2', 'Telegram Bot API', 'VPS'],
    poster: '/media/optbot/poster.webp',
    posterAlt: 'Демо PDF-счёт ОптБота с пометкой «не для оплаты»',
    posterWidth: 1191,
    posterHeight: 1684,
    mediaKind: 'document',
    localVideo: '',
    youtubeUrl: '',
    githubUrl: '',
    footnote:
      'Демо-бот сейчас не запущен — покажу сценарий в переписке или на созвоне. Реквизиты на счёте демонстрационные.',
  },
  {
    id: 'deckflow',
    tab: 'DeckFlow',
    number: '04',
    status: 'mac',
    statusLabel: 'Приложение для Mac',
    title: 'Локальный DJ-инструмент на две деки',
    task: 'Готовить и сводить свои треки без стриминга и подписок.',
    solution: 'Приложение на Electron: две деки, микшер, трёхполосный эквалайзер, кроссфейдер, MIDI.',
    result: 'Полноценный DJ-пульт для собственных файлов с русскими подсказками.',
    flow: ['Локальная библиотека', 'Дека A / дека B', 'EQ, фильтр, кроссфейдер', 'MIDI и горячие клавиши'],
    built:
      'Electron-приложение: деки, волна, BPM, трёхполосный EQ, кроссфейдер, горячие точки, MIDI Learn, русские подсказки. Сборка .dmg без подписи Apple.',
    ownership: 'Продуктовая логика, интерфейс, аудиодвижок, интеграция с Mac и выпуск .dmg.',
    stack: ['Electron', 'React', 'TypeScript', 'Web Audio API', 'Zustand', 'Dexie'],
    poster: '/media/deckflow/poster.webp',
    posterAlt: 'DeckFlow: две деки, библиотека и микшер',
    posterWidth: 1920,
    posterHeight: 1015,
    mediaKind: 'desktop',
    stills: [
      { src: '/media/deckflow/poster.webp', alt: 'Полный интерфейс', width: 1920, height: 1015 },
      { src: '/media/deckflow/still-mixer.webp', alt: 'Микшер', width: 600, height: 848 },
    ],
    localVideo: '',
    youtubeUrl: '',
    githubUrl: '',
    footnote: 'Локальное приложение для Mac — покажу по запросу.',
  },
  {
    id: 'cozyreset',
    tab: 'ВключиСебя',
    number: '05',
    status: 'archive',
    statusLabel: 'Архив',
    title: 'Экосистема самоподдержки в Telegram',
    task: 'Дать человеку спокойную самоподдержку прямо в Telegram.',
    solution: 'Бот и Mini App «Путь к Себе»: тесты, практики, ИИ-собеседница с лимитами, доступ Premium.',
    result: 'Маленькие шаги, чек-ины и PDF-отчёт, с которым можно прийти к специалисту.',
    flow: [
      'Telegram-бот',
      'Mini App «Путь к Себе»',
      'ВключиВнимание',
      'ИИ-Венера',
      'Доступ Premium',
      'PDF-отчёт для специалиста',
    ],
    built:
      'Бот (доступ, оплата Premium, поддержка, реферальная программа, новости), Mini App, ИИ с лимитами, практики, тесты с историей, PDF-отчёт. Сайт cozyreset.ru.',
    ownership: 'Продуктовая идея, сценарии бота и Mini App, оплата доступа, тексты о границах продукта.',
    stack: ['Telegram Bot API', 'Mini Apps', 'ИИ с лимитами', 'Платежи', 'PDF'],
    poster: '/media/cozyreset/card.svg',
    posterAlt: 'ВключиСебя / CozyReset: бот, Mini App и ИИ-Венера',
    posterWidth: 800,
    posterHeight: 1000,
    mediaKind: 'poster',
    // [[SHOT_COZYRESET]] Заменить card.svg настоящими скриншотами, когда они появятся.
    localVideo: '',
    youtubeUrl: 'https://www.youtube.com/watch?v=vtnyWM9_l40&t=1s',
    githubUrl: '',
    siteUrl: 'https://cozyreset.ru',
    siteLabel: 'Сайт проекта ↗',
    footnote: 'Проект в архиве. Не медицинский сервис и не замена психологу.',
  },
  {
    id: 'resumebot',
    tab: 'Резюме-бот',
    number: '06',
    status: 'archive',
    statusLabel: 'Архив',
    title: 'Резюме из вакансии — в Telegram',
    task: 'Не заполнять резюме с нуля.',
    solution: 'Бот подбирает навыки по названию должности или вакансии.',
    result: 'Черновик резюме готов за пару сообщений.',
    flow: ['Telegram-бот', 'Название работы или вакансия', 'Подбор навыков', 'Черновик резюме', 'Файл на выходе'],
    built:
      'Telegram-бот, подбор навыков (SkillPick), серверная часть и деплой на VPS. Сейчас проект не поддерживается.',
    ownership: 'Сценарий бота, логика подбора навыков, API и деплой.',
    stack: ['Python', 'Telegram Bot API', 'SkillPick', 'VPS'],
    poster: '/media/resumebot/card.svg',
    posterAlt: 'Схема резюме-бота: вакансия → навыки → документ',
    posterWidth: 800,
    posterHeight: 1000,
    mediaKind: 'poster',
    // [[SHOT_RESUMEBOT]] Заменить card.svg настоящими скриншотами, когда они появятся.
    localVideo: '',
    youtubeUrl: 'https://www.youtube.com/shorts/-5Z_4betR-8',
    githubUrl: '',
    footnote: 'Проект в архиве. Видео — на YouTube.',
  },
]

export const projects: Project[] = tyDeep(rawProjects)

export function getProject(id: ProjectId): Project {
  switch (id) {
    case 'linktech':
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

export function visibleStack(stack: string[]): { shown: string[]; extra: number } {
  const shown = stack.slice(0, 6)
  return { shown, extra: Math.max(0, stack.length - shown.length) }
}
