import { tyDeep } from '../lib/typograph.ts'

const PLACEHOLDER = /\[\[[A-Z0-9_]+\]\]/

export function isConfigured(value: string | undefined | null): value is string {
  if (!value) return false
  return !PLACEHOLDER.test(value)
}

export type Review = {
  text: string
  author: string
  context: string
}

const rawSite = {
  name: 'Дмитрий Деханов',
  role: 'Боты, Mini App и сайты',
  brandMark: '/media/brand/programmer.webp',
  photo: '[[PHOTO_PATH]]',
  telegramUrl: 'https://t.me/solevoy19',
  telegramHandle: '@solevoy19',
  email: 'dvv.spd@bk.ru',
  githubUrl: '[[GITHUB_PROFILE_URL]]',
  timezone: 'UTC+3',
  domain: 'portfoliodekha.ru',
  title: 'Дмитрий Деханов — Telegram-боты, Mini App и сайты',
  description:
    'Делаю Telegram-ботов, Mini App и сайты: от идеи до запуска. Кейсы с живым демо и видео. Пишите в Telegram.',
  knowsAbout: ['Telegram Bot API', 'Telegram Mini Apps', 'React', 'TypeScript', 'Python'],
  hero: {
    eyebrow: 'Открыт к новым проектам',
    // Вариант B: «Telegram-боты и Mini App, которые выглядят как большой продукт»
    // Вариант C: «Превращаю задачу в бота, Mini App или сайт — от идеи до запуска»
    h1: 'Делаю Telegram-ботов, Mini App и сайты, которыми приятно пользоваться',
    h1Accent: 'приятно пользоваться',
    subtitle:
      'Беру проект целиком и делаю сам: сценарий, интерфейс, сервер, оплаты и запуск. Ниже — то, что уже сделано.',
    primaryCta: 'Написать в Telegram',
    secondaryCta: 'Смотреть кейсы ↓',
    phoneCaption: 'Демонстрация: бот → Mini App → результат',
    phoneLabel: 'Демонстрация: пользователь пишет боту, открывает Mini App и оформляет заявку',
    flowKicker: 'Из чего состоит проект',
    flowIdleKicker: 'Описание',
    flowCueHover: 'Наведите на шаг',
    flowCueTap: 'Нажмите на шаг',
    flowIdle:
      'Сначала задача и канал: бот, Mini App или сайт. Потом экран, логика и результат, которым будут пользоваться.',
  },
  projectsIntro: {
    eyebrow: 'Кейсы',
    headline: 'Что я уже сделал',
    note: 'Боты, Mini App и приложения — с живым демо, видео или скриншотами. Нажмите на экран, чтобы рассмотреть.',
    youtubeCta: 'Смотреть на YouTube',
    youtubeCtaShort: 'YouTube',
    demoCta: 'Открыть демо ↗',
    sameCta: 'Хочу так же → Telegram',
    details: 'Технические детали',
    task: 'Задача',
    solution: 'Решение',
    result: 'Результат',
    built: 'Что построил',
    role: 'Моя роль',
    flow: 'Как устроено',
    lightboxClose: 'Закрыть',
    prev: 'Предыдущий',
    next: 'Следующий',
  },
  moreWork: {
    eyebrow: 'Ещё проекты',
    headline: 'Ещё проекты',
    note: 'Не только Telegram: справочник для смены ресторана и тренажёр меню.',
    items: [
      {
        id: 'pako-shift',
        kicker: 'PWA',
        title: 'Пако — на смене',
        text: 'Справочник меню и бара для официантов на iPhone: 59 блюд и 44 напитка, работает без сети.',
        stack: 'HTML / CSS / JS · Service Worker',
      },
      {
        id: 'pako-guide',
        kicker: 'Тренажёр',
        title: 'Карточки и экзамен по меню',
        text: 'Карточки блюд, тренировка и проверка — чтобы смена выучила меню, а не листала чаты.',
        stack: 'Python · vanilla JS · HTML',
      },
    ],
  },
  offer: {
    eyebrow: 'Форматы',
    headline: 'Что я делаю',
    aside:
      'А ещё: сервер и запуск, приём оплат (ЮKassa, Telegram Stars), ИИ-функции с лимитами, доработка уже запущенных проектов.',
    marquee:
      'Telegram Bot API · Mini Apps · TypeScript · React · Python · Fastify · PostgreSQL · SQLite · FFmpeg · Electron · VPS',
    cards: [
      {
        id: 'bots',
        title: 'Telegram-боты',
        text: 'Заявки, каталог, запись, уведомления, выдача файлов, оплата.',
      },
      {
        id: 'miniapp',
        title: 'Mini App',
        text: 'Полноценный интерфейс внутри Telegram: каталог, корзина, личный кабинет, статусы.',
      },
      {
        id: 'sites',
        title: 'Сайты и веб-приложения',
        text: 'Лендинги, панели, PWA, которые работают даже без интернета.',
      },
    ],
  },
  process: {
    eyebrow: 'Процесс',
    headline: 'Как я работаю',
    steps: [
      {
        id: '01',
        title: 'Обсуждаем задачу',
        text: 'Вы пишете в Telegram, что нужно. Задаю вопросы и предлагаю формат: бот, Mini App или сайт.',
      },
      {
        id: '02',
        title: 'Договариваемся',
        text: 'Фиксирую, что войдёт в первую версию, сроки и стоимость — всё в переписке, до начала работы.',
      },
      {
        id: '03',
        title: 'Делаю и показываю',
        text: 'Первая рабочая версия, которую можно потрогать руками. Дорабатываем по вашим комментариям.',
      },
      {
        id: '04',
        title: 'Запускаю и передаю',
        text: 'Запускаю на сервере, проверяем вместе, передаю код, доступы и инструкцию.',
      },
    ],
  },
  about: {
    eyebrow: 'Автор',
    headline: 'Обо мне',
    text: 'Меня зовут Дмитрий Деханов. Делаю Telegram-ботов, Mini App и сайты — один, поэтому вы общаетесь напрямую с тем, кто пишет код. Люблю, когда интерфейс понятен с первого касания, а под капотом всё надёжно: очередь, сервер, оплаты. В портфолио — аудиосервис в Mini App, оптовые каталоги, DJ-приложение для Mac и PWA для официантов.',
    facts: [
      { label: 'Полный цикл', value: 'от идеи до сервера' },
      { label: 'Формат', value: 'удалённо, по всей России' },
      { label: 'Часовой пояс', value: 'Москва, UTC+3' },
    ],
  },
  reviews: {
    eyebrow: 'Отзывы',
    headline: 'Что говорят',
  },
  contact: {
    headline: 'Есть идея? Напишите мне в Telegram',
    headlineAccent: 'в Telegram',
    text: 'Расскажите в двух словах, что нужно, — отвечу лично и предложу, как это сделать.',
    primary: 'Написать в Telegram',
    emailLead: 'или на почту',
    copied: 'Почта скопирована',
  },
  nav: [
    { href: '#projects', label: 'Кейсы' },
    { href: '#offer', label: 'Что делаю' },
    { href: '#process', label: 'Как работаю' },
    { href: '#about', label: 'Обо мне' },
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
    privacy: 'Конфиденциальность',
    security: 'Безопасность',
    terms: 'Условия',
    emailLabel: 'Почта',
    telegram: 'Telegram',
    github: 'GitHub',
    legal: 'Сайт не принимает оплату и не собирает данные. Это не публичная оферта.',
  },
  menu: {
    open: 'Меню',
    close: 'Закрыть',
  },
}

export const site = tyDeep(rawSite)

const rawReviews: Review[] = [
  { text: '[[REVIEW_1_TEXT]]', author: '[[REVIEW_1_AUTHOR]]', context: '[[REVIEW_1_CONTEXT]]' },
  { text: '[[REVIEW_2_TEXT]]', author: '[[REVIEW_2_AUTHOR]]', context: '[[REVIEW_2_CONTEXT]]' },
  { text: '[[REVIEW_3_TEXT]]', author: '[[REVIEW_3_AUTHOR]]', context: '[[REVIEW_3_CONTEXT]]' },
]

export const reviews: Review[] = rawReviews

export function configuredReviews(): Review[] {
  return reviews.filter((item) => isConfigured(item.text) && isConfigured(item.author))
}

export function projectsInTelegram(count: number): string {
  const mod10 = count % 10
  const mod100 = count % 100
  const word =
    mod10 === 1 && mod100 !== 11
      ? 'проект'
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? 'проекта'
        : 'проектов'
  return `${count}\u00A0${word} в\u00A0Telegram · живое демо · полный цикл от\u00A0идеи до\u00A0сервера`
}
