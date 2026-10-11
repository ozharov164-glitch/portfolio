const SHORT = new Set([
  'в',
  'во',
  'и',
  'а',
  'но',
  'к',
  'ко',
  'с',
  'со',
  'у',
  'о',
  'об',
  'от',
  'до',
  'на',
  'по',
  'за',
  'из',
  'не',
  'ни',
  'же',
  'ли',
  'бы',
  'или',
])

const PLACEHOLDER = /\[\[[A-Z0-9_]+\]\]/g

/** Non-breaking spaces after short Russian words, before em dashes, and between a number and its unit. */
export function ty(text: string): string {
  if (!text) return text

  const saved: string[] = []
  let result = text.replace(PLACEHOLDER, (token) => {
    saved.push(token)
    return `\uE000${saved.length - 1}\uE001`
  })

  result = result.replace(
    /(?<=^|[\s\u00A0«„"(])([A-Za-zА-Яа-яЁё]{1,3})[ \t]+/gu,
    (full, word: string) => (SHORT.has(word.toLowerCase()) ? `${word}\u00A0` : full),
  )

  result = result.replace(/([A-Za-zА-Яа-яЁё]{1,8})-([A-Za-zА-Яа-яЁё]{1,12})/gu, '$1\u2060-\u2060$2')
  result = result.replace(/[ \t]+—/g, '\u00A0—')
  result = result.replace(/(\d)[ \t]+([^\s\d]{1,12})/gu, '$1\u00A0$2')

  return result.replace(/\uE000(\d+)\uE001/g, (_, index: string) => saved[Number(index)] ?? '')
}

const SKIP_KEYS = new Set([
  'id',
  'href',
  'src',
  'poster',
  'brandMark',
  'photo',
  'domain',
  'email',
  'icon',
  'status',
  'signal',
  'mediaKind',
  'localVideo',
  'telegramUrl',
  'githubUrl',
  'youtubeUrl',
  'demoUrl',
  'siteUrl',
])

/** Apply `ty` to user-facing copy. URLs, ids, and paths stay untouched. */
export function tyDeep<T>(value: T): T {
  if (typeof value === 'string') return ty(value) as T
  if (Array.isArray(value)) return value.map((item) => tyDeep(item)) as T
  if (value && typeof value === 'object') {
    const output: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(value)) {
      if (SKIP_KEYS.has(key) || key.endsWith('Url')) output[key] = item
      else output[key] = tyDeep(item)
    }
    return output as T
  }
  return value
}
