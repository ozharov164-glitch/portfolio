import { useEffect, useState, type CSSProperties } from 'react'
import { publicUrl } from '../lib/publicUrl'

const TTY_LINES = [
  '> init telegram.bot',
  '> mount mini.app',
  'ok  канал готов',
  '> queue ffmpeg',
  'ok  файл в чат',
  '> deploy pages',
  'ok  200',
  '> listen hook',
  'ok  сценарий живой',
] as const

const RAIN_LEFT = `
0x35E2A1  >>
tg.bot    01
mini.app  ok
POST /ok  200
ffmpeg    ..
queue[1]  run
vps.up    ssh
pages     200
0x2AABEE  --
hook.init >>
bot.start 01
html/css  js
react     ts
fastify   ok
grammy    >>
sqlite    db
pwa.off   sw
pay.off   --
0x35E2A1  >>
tg.init   ok
screen    up
logic     go
server    on
result    1
`.trim()

const RAIN_RIGHT = `
>>  0x2AABEE
01  mini.app
ok  bot.loop
200 POST
..  worker
run queue
ssh vps
200 pages
--  hex.ff
>>  hook
01  start
js  html
ts  react
ok  api
>>  grammy
db  sqlite
sw  pwa
--  pay
>>  0x35E2A1
ok  init
up  screen
go  logic
on  server
1   result
`.trim()

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}

function useTerminalLog(lines: readonly string[], enabled: boolean) {
  const [log, setLog] = useState<string[]>([])
  const [typed, setTyped] = useState(enabled ? '' : (lines[0] ?? ''))

  useEffect(() => {
    if (!enabled) {
      setLog([])
      setTyped(lines[0] ?? '')
      return
    }

    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    let timeout = 0

    const run = () => {
      if (cancelled) return
      if (document.hidden) {
        timeout = window.setTimeout(run, 500)
        return
      }
      const line = lines[lineIndex] ?? ''
      if (charIndex < line.length) {
        charIndex += 1
        setTyped(line.slice(0, charIndex))
        timeout = window.setTimeout(run, 34)
        return
      }
      timeout = window.setTimeout(() => {
        if (cancelled) return
        setLog((prev) => [...prev.slice(-3), line])
        setTyped('')
        charIndex = 0
        lineIndex = (lineIndex + 1) % lines.length
        run()
      }, 780)
    }

    run()
    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [enabled, lines])

  return { log, typed }
}

export function SiteAtmosphere() {
  const reduced = usePrefersReducedMotion()
  const { log, typed } = useTerminalLog(TTY_LINES, !reduced)
  const photoStyle = {
    '--aurora-photo': `url("${publicUrl('/media/atmosphere/aurora.webp')}")`,
  } as CSSProperties

  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere__photo" style={photoStyle} />
      <div className="atmosphere__blob atmosphere__blob--a">
        <span className="atmosphere__blob-core" />
      </div>
      <div className="atmosphere__blob atmosphere__blob--b">
        <span className="atmosphere__blob-core" />
      </div>
      <div className="atmosphere__blob atmosphere__blob--c">
        <span className="atmosphere__blob-core" />
      </div>
      <div className="atmosphere__rain atmosphere__rain--left">
        <pre className="atmosphere__rain-track">
          {RAIN_LEFT}
          {'\n'}
          {RAIN_LEFT}
        </pre>
      </div>
      <div className="atmosphere__rain atmosphere__rain--right">
        <pre className="atmosphere__rain-track">
          {RAIN_RIGHT}
          {'\n'}
          {RAIN_RIGHT}
        </pre>
      </div>
      <div className="atmosphere__tty">
        {log.map((line, index) => (
          <p key={`${index}-${line}`}>{line}</p>
        ))}
        <p>
          {typed}
          {reduced ? null : <span className="atmosphere__caret" />}
        </p>
      </div>
      <div className="atmosphere__scan" />
      <svg className="atmosphere__draw" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path
          className="atmosphere__trace"
          d="M80 160C220 90 310 260 460 210C610 160 680 40 820 110C960 180 1040 320 1180 280C1280 252 1360 180 1420 210"
        />
        <path
          className="atmosphere__trace atmosphere__trace--slow"
          d="M40 720C180 640 260 780 420 740C590 696 660 560 820 600C980 640 1100 760 1280 700"
        />
        <circle className="atmosphere__node" cx="460" cy="210" r="3.2" />
        <circle className="atmosphere__node" cx="820" cy="110" r="3.2" />
        <circle className="atmosphere__node" cx="1180" cy="280" r="3.2" />
        <circle className="atmosphere__node" cx="420" cy="740" r="3.2" />
        <circle className="atmosphere__node" cx="820" cy="600" r="3.2" />
      </svg>
      <div className="atmosphere__grid" />
      <div className="atmosphere__crt" />
      <div className="atmosphere__vignette" />
      <div className="atmosphere__noise" />
    </div>
  )
}
