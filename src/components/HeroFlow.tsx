import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { site } from '../content/site'
import { usePrefersReducedMotion } from '../lib/motion'
import { Icon, type IconName } from './icons/Icon'

const ICONS: IconName[] = ['send', 'smartphone', 'workflow', 'server', 'badge-check', 'rocket']
const LAST = site.heroFlow.length - 1

function ease(t: number): number {
  const x1 = 0.65
  const y1 = 0
  const x2 = 0.35
  const y2 = 1
  let start = 0
  let end = 1
  for (let i = 0; i < 8; i += 1) {
    const mid = (start + end) / 2
    const x = 3 * (1 - mid) * (1 - mid) * mid * x1 + 3 * (1 - mid) * mid * mid * x2 + mid * mid * mid
    if (x < t) start = mid
    else end = mid
  }
  const u = (start + end) / 2
  return 3 * (1 - u) * (1 - u) * u * y1 + 3 * (1 - u) * u * u * y2 + u * u * u
}

export function HeroFlow() {
  const cardRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const railRef = useRef<SVGPathElement>(null)
  const progressRef = useRef<SVGPathElement>(null)
  const signalRef = useRef<SVGGElement>(null)
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([])
  const mobileListRef = useRef<HTMLOListElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const tRef = useRef(0)
  const activeRef = useRef(0)
  const visibleRef = useRef(false)
  const desktopRef = useRef(false)
  const hoverRef = useRef(false)
  const pausedRef = useRef(false)
  const timerRef = useRef(0)
  const runRef = useRef(0)
  const scheduleRef = useRef<() => void>(() => {})
  const [active, setActive] = useState(0)
  const [shown, setShown] = useState(0)
  const [fading, setFading] = useState(false)
  const [pulse, setPulse] = useState(false)
  const [desktop, setDesktop] = useState(false)
  const reduced = usePrefersReducedMotion()
  const labelId = useId()
  const step = site.heroFlow[shown] ?? site.heroFlow[0]

  function place(t: number) {
    const rail = railRef.current
    const progress = progressRef.current
    const signal = signalRef.current
    if (!rail || !progress || !signal) return
    const length = rail.getTotalLength()
    if (!length) return
    const point = rail.getPointAtLength(Math.max(0, Math.min(1, t)) * length)
    signal.setAttribute('transform', `translate(${point.x} ${point.y})`)
    progress.style.transform = `scaleX(${Math.max(0, Math.min(1, t))})`
    tRef.current = t
  }

  function measure() {
    const svg = svgRef.current
    const rail = railRef.current
    const progress = progressRef.current
    if (!svg || !rail || !progress) return
    const box = svg.getBoundingClientRect()
    const points = buttonsRef.current.flatMap((button) => {
      if (!button) return []
      const rect = button.getBoundingClientRect()
      return [{ x: rect.left + rect.width / 2 - box.left, y: rect.top + rect.height / 2 - box.top }]
    })
    const first = points[0]
    const last = points[points.length - 1]
    if (!first || !last) return
    const d = `M ${first.x} ${first.y} L ${last.x} ${last.y}`
    rail.setAttribute('d', d)
    progress.setAttribute('d', d)
    place(tRef.current)
  }

  function travel(index: number, duration: number, done?: () => void) {
    const from = tRef.current
    const to = LAST === 0 ? 0 : index / LAST
    if (duration <= 0 || reduced) {
      place(to)
      setActive(index)
      activeRef.current = index
      done?.()
      return
    }
    const started = performance.now()
    const run = runRef.current + 1
    runRef.current = run
    const tick = (now: number) => {
      if (run !== runRef.current) return
      const u = Math.min(1, (now - started) / duration)
      place(from + (to - from) * ease(u))
      if (u < 1) {
        window.requestAnimationFrame(tick)
        return
      }
      setActive(index)
      activeRef.current = index
      setPulse(true)
      window.setTimeout(() => setPulse(false), 600)
      done?.()
    }
    window.requestAnimationFrame(tick)
  }

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)')
    const sync = () => {
      desktopRef.current = media.matches
      setDesktop(media.matches)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    measure()
    const card = cardRef.current
    if (!card) return
    const observer = new ResizeObserver(() => measure())
    observer.observe(card)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [desktop])

  useEffect(() => {
    if (shown === active) return
    setFading(true)
    const wait = reduced ? 0 : 160
    const timer = window.setTimeout(() => {
      setShown(active)
      setFading(false)
    }, wait)
    return () => window.clearTimeout(timer)
  }, [active, reduced, shown])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? false
      },
      { threshold: 0.35 },
    )
    observer.observe(card)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!desktop || reduced) return
    let stopped = false

    const schedule = () => {
      window.clearTimeout(timerRef.current)
      if (stopped || !visibleRef.current || hoverRef.current || pausedRef.current) return
      const index = activeRef.current
      const wait = index >= LAST ? 2400 : 1800
      timerRef.current = window.setTimeout(() => {
        if (stopped || !visibleRef.current || hoverRef.current || pausedRef.current) return
        if (activeRef.current >= LAST) {
          const signal = signalRef.current
          if (signal) signal.style.opacity = '0'
          window.setTimeout(() => {
            place(0)
            setActive(0)
            activeRef.current = 0
            if (signal) signal.style.opacity = '1'
            schedule()
          }, 200)
          return
        }
        travel(activeRef.current + 1, 900, schedule)
      }, wait)
    }

    const boot = window.setTimeout(schedule, 400)
    scheduleRef.current = schedule
    return () => {
      stopped = true
      window.clearTimeout(boot)
      window.clearTimeout(timerRef.current)
    }
  }, [desktop, reduced])

  useEffect(() => {
    if (desktop || reduced) return
    const list = mobileListRef.current
    const dot = dotRef.current
    if (!list || !dot) return
    const tiles = [...list.querySelectorAll<HTMLElement>('.stepper__tile')]
    const current = tiles[active]
    const first = tiles[0]
    if (!current || !first) return
    const y = current.getBoundingClientRect().top - first.getBoundingClientRect().top
    dot.style.transform = `translateY(${y}px)`
    if (fillRef.current) fillRef.current.style.height = `${y}px`
  }, [active, desktop, reduced])

  function seek(index: number, event?: PointerEvent<HTMLButtonElement>) {
    if (event && event.pointerType !== 'mouse') return
    if (!desktopRef.current) return
    travel(index, reduced ? 0 : 900)
  }

  function choose(index: number) {
    pausedRef.current = true
    window.clearTimeout(timerRef.current)
    travel(index, reduced ? 0 : desktopRef.current ? 900 : 600)
  }

  function onKey(event: KeyboardEvent<HTMLOListElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const buttons = buttonsRef.current.filter((button): button is HTMLButtonElement => button !== null)
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    if (index < 0) return
    const next = event.key === 'ArrowRight' ? Math.min(LAST, index + 1) : Math.max(0, index - 1)
    event.preventDefault()
    buttons[next]?.focus()
    choose(next)
  }

  return (
    <div
      className="hero-flow card-premium"
      ref={cardRef}
      onMouseEnter={() => {
        hoverRef.current = true
        window.clearTimeout(timerRef.current)
      }}
      onMouseLeave={() => {
        hoverRef.current = false
        if (!pausedRef.current) scheduleRef.current()
      }}
    >
      <div className="signal-track">
        <div className="signal-stage">
          <svg className="signal-svg" ref={svgRef} aria-hidden="true">
            <defs>
              <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2AABEE" />
                <stop offset="100%" stopColor="#35E2A1" />
              </linearGradient>
            </defs>
            <path ref={railRef} className="signal-rail" fill="none" />
            <path ref={progressRef} className="signal-progress" stroke="url(#flow-grad)" fill="none" />
            <g ref={signalRef}>
              <circle className={pulse ? 'signal-halo is-pulse' : 'signal-halo'} r="14" />
              <circle className="signal-dot" r="5" />
            </g>
          </svg>
          <ol className="signal-nodes" onKeyDown={onKey}>
            {site.heroFlow.map((node, index) => {
              const icon = ICONS[index] ?? 'send'
              const state = index === active ? 'is-active' : index < active ? 'is-done' : ''
              return (
                <li key={node.id}>
                  <span className="signal-nodes__num">{String(index + 1).padStart(2, '0')}</span>
                  <button
                    type="button"
                    className={['icon-tile', 'signal-nodes__btn', state].filter(Boolean).join(' ')}
                    aria-pressed={index === active}
                    aria-label={node.label}
                    ref={(el) => {
                      buttonsRef.current[index] = el
                    }}
                    onPointerEnter={(event) => seek(index, event)}
                    onFocus={() => {
                      if (desktopRef.current) travel(index, reduced ? 0 : 900)
                    }}
                    onClick={() => choose(index)}
                  >
                    <Icon name={icon} size={24} />
                  </button>
                  <span className="signal-nodes__label">{node.label}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <div className={fading ? 'signal-readout is-out' : 'signal-readout is-in'} aria-live="polite">
          <p className="signal-readout__num grad-text" id={labelId}>
            {String(shown + 1).padStart(2, '0')}
          </p>
          <div>
            <p className="signal-readout__title">{step?.label}</p>
            <p className="signal-readout__text">{step?.hint}</p>
          </div>
        </div>
      </div>

      <div className="stepper">
        <span className="stepper__rail" aria-hidden="true">
          <span className="stepper__fill" ref={fillRef} />
          <span className="stepper__dot" ref={dotRef} />
        </span>
        <ol className="stepper__list" ref={mobileListRef}>
        {site.heroFlow.map((node, index) => {
          const icon = ICONS[index] ?? 'send'
          const open = index === active
          return (
            <li key={node.id} className={open ? 'stepper__item is-open' : 'stepper__item'}>
              <button type="button" className="stepper__hit" aria-pressed={open} onClick={() => choose(index)}>
                <span className={open ? 'icon-tile stepper__tile is-active' : 'icon-tile stepper__tile'}>
                  <Icon name={icon} size={20} />
                </span>
                <span className="stepper__copy">
                  <span className="stepper__num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="stepper__label">{node.label}</span>
                </span>
              </button>
              <div className="stepper__panel">
                <div className="stepper__clip">
                  <p>{node.hint}</p>
                </div>
              </div>
            </li>
          )
        })}
        </ol>
      </div>
    </div>
  )
}
