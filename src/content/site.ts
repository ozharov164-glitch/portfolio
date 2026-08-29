const PLACEHOLDER = /\[\[[A-Z0-9_]+\]\]/

export function isConfigured(value: string | undefined | null): value is string {
  if (!value) return false
  return !PLACEHOLDER.test(value)
}

export const icons = {
  miniapp: '/media/icons/icon-miniapp.webp',
  bot: '/media/icons/icon-bot.webp',
  ai: '/media/icons/icon-ai.webp',
  harden: '/media/icons/icon-harden.webp',
  telegram: '/media/icons/icon-telegram.webp',
  invoice: '/media/icons/icon-invoice.webp',
  mixer: '/media/icons/icon-mixer.webp',
  cart: '/media/icons/icon-cart.webp',
  shift: '/media/icons/icon-shift.webp',
  flow: '/media/icons/icon-flow.webp',
} as const

export const site = {
  name: 'Дмитрий Деханов',
  role: 'Боты, Mini Apps и сайты',
  brandMark: '/media/brand/programmer.webp',
  telegramUrl: 'https://t.me/solevoy19',
  telegramHandle: '@solevoy19',
  email: 'dvv.spd@bk.ru',
  githubUrl: 'https://github.com/ozharov164-glitch/portfolio',
  timezone: 'UTC+3',
  domain: 'portfoliodekha.ru',
  year: '2026',
  title: 'Дмитрий Деханов — боты, Mini Apps и сайты',
  description:
    'Собираю ботов, Telegram Mini Apps и сайты под конкретную задачу. Кейсы — рабочие сборки, не макеты.',
  hero: {
    eyebrow: 'Открыт к проектной работе',
    h1Before: 'Соберу продукт, в котором человек нажимает —',
    h1Accent: 'и получает результат.',
    subtitle:
      'Бот под вашу задачу, Mini App, сайт или внутренний инструмент. FADELINE, ОптБот, DeckFlow и PWA — разные продукты, не один шаблон.',
    promise: 'Первый разговор — про одну задачу, а не про «сделайте всё».',
    primaryCta: 'Смотреть кейсы',
    secondaryCta: 'Написать в Telegram',
    stackLine:
      'Telegram Bot API · Mini Apps · HTML / CSS / JS · Python · TypeScript · React · Fastify · FFmpeg · Payments · Electron · VPS',
    flowKicker: 'Системный путь',
    flowIdleKicker: 'Схема',
    flowIdle:
      'Сначала задача и канал: бот, Mini App или сайт. Потом экран, логика и результат, которым будут пользоваться.',
  },
  proof: [
    { kicker: '07', label: 'сборок в портфолио' },
    { kicker: '3', label: 'канала: бот, Mini App, сайт' },
    { kicker: 'ИИ', label: 'с лимитами, не бесконечный чат' },
  ],
  pitch: {
    eyebrow: 'Что предлагаю',
    headline: 'Соберу бота, Mini App или сайт под вашу задачу',
    cards: [
      {
        id: 'bots',
        kicker: 'Боты и Mini Apps',
        text: 'Telegram-бот или экран внутри Telegram. Сценарий собираю под задачу: заявка, статус, файл, уведомление — не готовый шаблон одной ниши.',
        icon: icons.bot,
        accent: false,
      },
      {
        id: 'sites',
        kicker: 'Сайты и панели',
        text: 'Если удобнее браузер — страница, PWA или панель. Канал выбираем по тому, чем будут пользоваться, а не по одному продукту.',
        icon: icons.miniapp,
        accent: true,
      },
    ],
  },
  projectsIntro: {
    eyebrow: 'Кейсы',
    headline: 'Не макеты. Сборки, которые уже дошли до рабочего сценария.',
    note: 'Аудио, опт, DJ, ИИ, смена — разные задачи. Два продукта в архиве. Записи FADELINE, «ВключиСебя» и резюме-бота — в карточках. У ОптБота ссылка появится позже. Показать живую сборку могу по запросу, если она сейчас запущена.',
    shotHint: 'Нажмите снимок — откроется целиком',
    youtubeCta: 'Смотреть на YouTube',
    youtubeCtaShort: 'YouTube',
    lightboxClose: 'Закрыть',
  },
  moreWork: {
    eyebrow: 'Ещё',
    headline: 'Сайты и инструменты вне Telegram',
    note: 'Сайты и офлайн-инструменты тоже собираю — не только Telegram.',
    items: [
      {
        id: 'pako-shift',
        kicker: 'PWA',
        title: 'Пако — на смене',
        text: 'Справочник меню и бара для официантов на iPhone: 59 блюд и 44 напитка, работает без сети.',
        stack: 'HTML / CSS / JS · Service Worker',
        icon: icons.shift,
      },
      {
        id: 'pako-guide',
        kicker: 'Шпаргалка',
        title: 'Карточки и экзамен по меню',
        text: 'Карточки блюд, тренировка и проверка — чтобы смена выучила меню, а не листала чаты.',
        stack: 'Python · vanilla JS · HTML',
        icon: icons.flow,
      },
    ],
  },
  capabilities: {
    eyebrow: 'Навыки',
    headline: 'Что могу взять в работу',
    stackLine:
      'Telegram Bot API · Mini Apps · HTML / CSS / JS · Python · TypeScript · React · Fastify · Payments · PostgreSQL · SQLite · FFmpeg · ИИ с лимитами · Electron · VPS',
    items: [
      {
        id: 'bot',
        title: 'Боты под разные задачи',
        result:
          'Заявки, каталог, уведомления, выдача файла, запись на услугу — сценарий под вашу работу, не один готовый шаблон.',
        signal: 'blue',
        icon: icons.bot,
      },
      {
        id: 'miniapp',
        title: 'Mini App внутри Telegram',
        result:
          'Экран, где настраивают задачу и видят статус. FADELINE — один из таких экранов, не единственный.',
        signal: 'green',
        icon: icons.miniapp,
      },
      {
        id: 'web',
        title: 'Сайты, PWA и панели',
        result:
          'Страница или приложение в браузере, в том числе офлайн. Как справочник «Пако — на смене».',
        signal: 'green',
        icon: icons.shift,
      },
      {
        id: 'harden',
        title: 'Сервер, оплаты, ИИ с лимитами',
        result:
          'API, очередь, запуск на сервере, оплаты. ИИ — с понятным входом, не бесконечный чат. Могу довести уже живой продукт.',
        signal: 'blue',
        icon: icons.harden,
      },
    ],
  },
  process: {
    eyebrow: 'Как работаю',
    headline: 'Без тумана в разработке',
    copy: 'Захожу, когда понятен результат: бот, Mini App, сайт или внутренний инструмент. На выходе — работающая сборка, а не только макет.',
    steps: [
      {
        id: '01',
        title: 'Фиксируем один полезный сценарий',
        text: 'Что человек нажимает и что получает на выходе. Остальное откладываем.',
        icon: icons.bot,
      },
      {
        id: '02',
        title: 'Собираю рабочую первую версию',
        text: 'Бот, Mini App, сайт или внутренний инструмент — то, что уже можно прогнать руками.',
        icon: icons.flow,
      },
      {
        id: '03',
        title: 'Проверяем, запускаем, передаю',
        text: 'Прогоняем сценарий, поднимаем сборку и оставляем понятную передачу.',
        icon: icons.harden,
      },
    ],
  },
  contact: {
    eyebrow: 'Контакт',
    headline: 'Нужен бот, Mini App или сайт под конкретную работу?',
    text: 'Напишите в Telegram или на почту. Разберём одну задачу и объём первого этапа.',
    legal:
      'На сайте нет форм и приёма оплаты. Переписка идёт в Telegram или по почте. Это не публичная оферта: условия работы согласовываем в переписке.',
    primary: 'Написать в Telegram',
  },
  nav: [
    { href: '#projects', label: 'Кейсы' },
    { href: '#more', label: 'Ещё' },
    { href: '#capabilities', label: 'Что могу' },
    { href: '#process', label: 'Как работаю' },
    { href: '#contact', label: 'Контакт' },
  ],
  heroFlow: [
    {
      id: 'task',
      label: 'Задача',
      hint: 'Какой результат нужен человеку. Не «сделайте всё», а один понятный выход.',
    },
    {
      id: 'channel',
      label: 'Канал',
      hint: 'Telegram-бот, Mini App или сайт — то, чем будут пользоваться каждый день.',
    },
    {
      id: 'screen',
      label: 'Экран',
      hint: 'Кнопки, форма, каталог, плеер: человеку ясно, куда нажать.',
    },
    {
      id: 'logic',
      label: 'Логика',
      hint: 'API, лимиты, оплаты — по необходимости. Не обязательно всё сразу.',
    },
    {
      id: 'server',
      label: 'Сервер',
      hint: 'Очередь, файлы, база и запуск на своём сервере.',
    },
    {
      id: 'result',
      label: 'Результат',
      hint: 'Файл, заявка, страница или статус — то, что обещали на входе.',
    },
  ],
  footer: {
    who: 'Дмитрий Деханов · удалённо · UTC+3',
    privacy: 'Конфиденциальность',
    security: 'Безопасность',
    terms: 'Условия',
    emailLabel: 'Почта',
    copy: '© 2026. Портфолио Дмитрия Деханова. В кейсах — записанные рабочие прототипы.',
  },
} as const
