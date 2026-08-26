/** Prefix a public-folder path with Vite `base` (needed on GitHub Pages). */
export function publicUrl(path: string): string {
  if (!path || /^(https?:|data:|mailto:|#)/i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`
}
