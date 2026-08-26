import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { site } from '../content/site'

type Point = { x: number; y: number }

const OPEN_DELAY_MS = 70
const CLOSE_DELAY_MS = 160
const PATH_SETTLE_MS = 400

function toPath(points: Point[]): string {
  if (points.length < 2) return ''
  return points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ')
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function hasHoverPointer(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export function HeroFlow() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([])
  const signalRef = useRef<SVGCircleElement>(null)
  const openTimer = useRef(0)
  const closeTimer = useRef(0)
  const [path, setPath] = useState('')
  const [liveNode, setLiveNode] = useState(0)
  const [openHint, setOpenHint] = useState<number | null>(null)
  const hintId = useId()
  const readoutId = `${hintId}-readout`
  const previewIndex = openHint ?? liveNode
  const preview = site.heroFlow[previewIndex] ?? site.heroFlow[0]

  function clearHintTimers() {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
  }

  function openAt(index: number) {
    clearHintTimers()
    setOpenHint(index)
  }

  function scheduleOpen(index: number) {
    if (!hasHoverPointer()) return
    clearHintTimers()
    if (openHint === index) return
    if (openHint !== null) {
      setOpenHint(index)
      return
    }
    openTimer.current = window.setTimeout(() => setOpenHint(index), OPEN_DELAY_MS)
  }

  function scheduleClose() {
    if (!hasHoverPointer()) return
    clearHintTimers()
    closeTimer.current = window.setTimeout(() => setOpenHint(null), CLOSE_DELAY_MS)
  }

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const measure = () => {
      const box = wrap.getBoundingClientRect()
      const points = site.heroFlow.map((_, index) => {
        const dot = dotRefs.current[index]
        if (!dot) return { x: 0, y: 0 }
        const rect = dot.getBoundingClientRect()
        return {
          x: rect.left + rect.width / 2 - box.left,
          y: rect.top + rect.height / 2 - box.top,
        }
      })
      setPath(toPath(points))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    window.addEventListener('resize', measure)

    let frame = 0
    const started = performance.now()
    const tick = (now: number) => {
      measure()
      if (now - started < PATH_SETTLE_MS) {
        frame = window.requestAnimationFrame(tick)
      }
    }
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [openHint])

  useEffect(() => {
    return () => clearHintTimers()
  }, [])

  useEffect(() => {
    const signal = signalRef.current
    if (!signal || !path) return

    signal.style.offsetPath = `path('${path}')`

    if (prefersReducedMotion()) {
      signal.style.offsetDistance = '0%'
      signal.style.opacity = '0'
      setLiveNode(0)
      return
    }

    const travel = signal.animate(
      [
        { offsetDistance: '0%', opacity: 0, offset: 0 },
        { offsetDistance: '4%', opacity: 1, offset: 0.04 },
        { offsetDistance: '96%', opacity: 1, offset: 0.46 },
        { offsetDistance: '100%', opacity: 0, offset: 0.5 },
        { offsetDistance: '100%', opacity: 0, offset: 1 },
      ],
      {
        duration: 6200,
        iterations: Infinity,
        easing: 'linear',
      },
    )

    let frame = 0
    let lastIndex = -1
    const tick = () => {
      const effect = travel.effect
      if (effect && 'getComputedTiming' in effect) {
        const progress = effect.getComputedTiming().progress ?? 0
        const along = progress <= 0.5 ? progress / 0.5 : 0
        const index = Math.min(
          site.heroFlow.length - 1,
          Math.floor(along * site.heroFlow.length),
        )
        if (index !== lastIndex) {
          lastIndex = index
          setLiveNode(index)
        }
      }
      frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(frame)
      travel.cancel()
    }
  }, [path])

  useEffect(() => {
    const close = (event: PointerEvent) => {
      const wrap = wrapRef.current
      if (!wrap) return
      if (event.target instanceof Node && wrap.contains(event.target)) return
      setOpenHint(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [])

  return (
    <div className="hero-flow" ref={wrapRef} onMouseLeave={scheduleClose}>
      <div className="hero-flow__head">
        <p className="hero-flow__kicker">{site.hero.flowKicker}</p>
        <p className="hero-flow__cue">
          <span className="hero-flow__cue-hover">Наведите шаг</span>
          <span className="hero-flow__cue-tap">Нажмите шаг</span>
        </p>
      </div>
      <ol className="hero-flow__nodes">
        {site.heroFlow.map((node, index) => {
          const open = openHint === index
          return (
            <li
              key={node.id}
              className={open ? 'hero-flow__item is-open' : 'hero-flow__item'}
              onMouseEnter={() => scheduleOpen(index)}
            >
              <button
                type="button"
                className={
                  liveNode === index ? 'hero-flow__node is-live' : 'hero-flow__node'
                }
                aria-expanded={open}
                aria-controls={`${hintId}-${node.id}`}
                aria-describedby={readoutId}
                onFocus={() => openAt(index)}
                onBlur={(event) => {
                  if (!hasHoverPointer()) return
                  const next = event.relatedTarget
                  if (!(next instanceof Node) || wrapRef.current?.contains(next)) return
                  scheduleClose()
                }}
                onClick={() => {
                  if (!hasHoverPointer()) {
                    setOpenHint((current) => (current === index ? null : index))
                  }
                }}
              >
                <span
                  className="hero-flow__dot"
                  aria-hidden="true"
                  ref={(el) => {
                    dotRefs.current[index] = el
                  }}
                />
                <span className="hero-flow__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="hero-flow__label">{node.label}</span>
              </button>
              <div
                className={open ? 'hero-flow__hint is-open' : 'hero-flow__hint'}
                id={`${hintId}-${node.id}`}
              >
                <div className="hero-flow__hint-clip">
                  <p className="hero-flow__hint-text">{node.hint}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
      <p className="hero-flow__readout" id={readoutId} aria-live="polite">
        <span className="hero-flow__readout-kicker">
          {openHint === null
            ? site.hero.flowIdleKicker
            : `${String(previewIndex + 1).padStart(2, '0')} ${preview.label}`}
        </span>
        <span key={openHint === null ? 'idle' : preview.id} className="hero-flow__readout-text">
          {openHint === null ? site.hero.flowIdle : preview.hint}
        </span>
      </p>
      <svg className="hero-flow__svg" aria-hidden="true">
        <path className="hero-flow__line" d={path} fill="none" />
        <circle ref={signalRef} className="hero-flow__signal" r="4" cx="0" cy="0" />
      </svg>
    </div>
  )
}
