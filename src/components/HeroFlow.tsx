import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { site } from '../content/site'

type Point = { x: number; y: number }
type FlowKind = 'dwell' | 'move' | 'hold' | 'reset' | 'seek'

type Machine = {
  kind: FlowKind
  node: number
  fromT: number
  toT: number
  started: number
}

const OPEN_DELAY_MS = 70
const CLOSE_DELAY_MS = 160
const PATH_SETTLE_MS = 400
const MOVE_MS = 620
const DWELL_MS = 400
const HOLD_MS = 720
const RESET_MS = 280
const SEEK_MS = 360
const PING_MS = 460
const TRAIL = [0.042, 0.084] as const
const STEP_COUNT = site.heroFlow.length
const LAST = STEP_COUNT - 1

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

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value))
}

function easeInOutCubic(value: number): number {
  const t = clamp01(value)
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
}

function nodeT(index: number): number {
  return index / LAST
}

function tToNode(t: number): number {
  return Math.min(LAST, Math.max(0, Math.round(t * LAST)))
}

function applyOffset(el: SVGElement | null, t: number) {
  if (!el) return
  el.style.offsetDistance = `${(clamp01(t) * 100).toFixed(3)}%`
}

function bindPath(el: SVGElement | null, path: string) {
  if (!el) return
  el.style.offsetPath = path ? `path('${path}')` : 'none'
}

function assertNever(value: never): never {
  throw new Error(`unexpected flow kind: ${String(value)}`)
}

export function HeroFlow() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([])
  const signalRef = useRef<SVGCircleElement>(null)
  const coreRef = useRef<SVGCircleElement>(null)
  const progressRef = useRef<SVGPathElement>(null)
  const trailRefs = useRef<Array<SVGCircleElement | null>>([])
  const alongRef = useRef(0)
  const visibleRef = useRef(true)
  const reduceRef = useRef(false)
  const openHintRef = useRef<number | null>(null)
  const machineRef = useRef<Machine>({
    kind: 'dwell',
    node: 0,
    fromT: 0,
    toT: 0,
    started: 0,
  })
  const openTimer = useRef(0)
  const closeTimer = useRef(0)
  const pingTimer = useRef(0)
  const [path, setPath] = useState('')
  const [liveNode, setLiveNode] = useState(0)
  const [armed, setArmed] = useState<number | null>(null)
  const [openHint, setOpenHint] = useState<number | null>(null)
  const hintId = useId()
  const readoutId = `${hintId}-readout`
  const previewIndex = openHint ?? liveNode
  const preview = site.heroFlow[previewIndex] ?? site.heroFlow[0]
  const clock = `${String(liveNode + 1).padStart(2, '0')}/${String(STEP_COUNT).padStart(2, '0')}`
  openHintRef.current = openHint

  function ping(index: number) {
    window.clearTimeout(pingTimer.current)
    setArmed(index)
    pingTimer.current = window.setTimeout(() => setArmed(null), PING_MS)
  }

  function commitNode(index: number) {
    setLiveNode((current) => {
      if (current === index) return current
      ping(index)
      return index
    })
  }

  function paint(t: number) {
    alongRef.current = t
    applyOffset(signalRef.current, t)
    applyOffset(coreRef.current, t)
    TRAIL.forEach((lag, index) => {
      applyOffset(trailRefs.current[index], t - lag)
    })
    const progress = progressRef.current
    if (progress) progress.style.strokeDashoffset = String(1 - t)
    commitNode(tToNode(t))
  }

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
    bindPath(signalRef.current, path)
    bindPath(coreRef.current, path)
    trailRefs.current.forEach((el) => bindPath(el, path))
    paint(alongRef.current)
  }, [path])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry?.isIntersecting ?? true
      },
      { threshold: 0.12 },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const machine = machineRef.current
    if (openHint === null) {
      const node = tToNode(alongRef.current)
      machine.kind = 'dwell'
      machine.node = node
      machine.fromT = nodeT(node)
      machine.toT = nodeT(node)
      machine.started = performance.now()
      paint(nodeT(node))
      return
    }
    machine.kind = 'seek'
    machine.fromT = alongRef.current
    machine.toT = nodeT(openHint)
    machine.node = openHint
    machine.started = performance.now()
  }, [openHint])

  useEffect(() => {
    if (!path) return

    reduceRef.current = prefersReducedMotion()
    if (reduceRef.current) {
      paint(0)
      const signal = signalRef.current
      const core = coreRef.current
      if (signal) signal.style.opacity = '0'
      if (core) core.style.opacity = '0'
      trailRefs.current.forEach((el) => {
        if (el) el.style.opacity = '0'
      })
      setLiveNode(0)
      return
    }

    const machine = machineRef.current
    if (machine.started === 0) machine.started = performance.now()
    let frame = 0
    let pausedAt = 0

    const tick = (now: number) => {
      if (!visibleRef.current || document.hidden) {
        if (!pausedAt) pausedAt = now
        frame = window.requestAnimationFrame(tick)
        return
      }
      if (pausedAt) {
        machine.started += now - pausedAt
        pausedAt = 0
      }

      const elapsed = now - machine.started
      const signal = signalRef.current
      const core = coreRef.current

      switch (machine.kind) {
        case 'dwell': {
          paint(nodeT(machine.node))
          if (signal) signal.style.opacity = '1'
          if (core) core.style.opacity = '1'
          if (openHintRef.current === null && elapsed >= DWELL_MS) {
            if (machine.node >= LAST) {
              machine.kind = 'hold'
              machine.started = now
            } else {
              machine.kind = 'move'
              machine.fromT = nodeT(machine.node)
              machine.toT = nodeT(machine.node + 1)
              machine.started = now
            }
          }
          break
        }
        case 'move': {
          const u = easeInOutCubic(elapsed / MOVE_MS)
          paint(machine.fromT + (machine.toT - machine.fromT) * u)
          if (elapsed >= MOVE_MS) {
            machine.node = Math.min(LAST, machine.node + 1)
            machine.kind = 'dwell'
            machine.started = now
            paint(nodeT(machine.node))
          }
          break
        }
        case 'hold': {
          paint(1)
          if (elapsed >= HOLD_MS) {
            machine.kind = 'reset'
            machine.started = now
          }
          break
        }
        case 'reset': {
          const fade = 1 - clamp01(elapsed / RESET_MS)
          if (signal) signal.style.opacity = String(fade)
          if (core) core.style.opacity = String(fade)
          paint(1)
          if (elapsed >= RESET_MS) {
            machine.kind = 'dwell'
            machine.node = 0
            machine.started = now
            if (signal) signal.style.opacity = '1'
            if (core) core.style.opacity = '1'
            paint(0)
          }
          break
        }
        case 'seek': {
          const u = easeInOutCubic(elapsed / SEEK_MS)
          paint(machine.fromT + (machine.toT - machine.fromT) * u)
          if (signal) signal.style.opacity = '1'
          if (core) core.style.opacity = '1'
          if (elapsed >= SEEK_MS) {
            machine.kind = 'dwell'
            machine.node = tToNode(machine.toT)
            machine.started = now
            paint(machine.toT)
          }
          break
        }
        default:
          assertNever(machine.kind)
      }

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [path])

  useEffect(() => {
    return () => {
      clearHintTimers()
      window.clearTimeout(pingTimer.current)
    }
  }, [])

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
        <p className="hero-flow__meta">
          <span className="hero-flow__trace" aria-hidden="true">
            <span className={openHint === null ? 'hero-flow__trace-dot is-run' : 'hero-flow__trace-dot'} />
            <span className="mono">{clock}</span>
          </span>
          <span className="hero-flow__cue">
            <span className="hero-flow__cue-hover">Наведите шаг</span>
            <span className="hero-flow__cue-tap">Нажмите шаг</span>
          </span>
        </p>
      </div>
      <ol className="hero-flow__nodes">
        {site.heroFlow.map((node, index) => {
          const open = openHint === index
          const live = liveNode === index
          const done = index < liveNode
          const nodeClass = [
            'hero-flow__node',
            live ? 'is-live' : '',
            done ? 'is-done' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <li
              key={node.id}
              className={open ? 'hero-flow__item is-open' : 'hero-flow__item'}
              onMouseEnter={() => scheduleOpen(index)}
            >
              <button
                type="button"
                className={nodeClass}
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
                  className={
                    armed === index ? 'hero-flow__dot is-ping' : 'hero-flow__dot'
                  }
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
      <svg
        className={path ? 'hero-flow__svg' : 'hero-flow__svg is-idle'}
        aria-hidden="true"
      >
        <path className="hero-flow__rail" d={path} fill="none" />
        <path
          ref={progressRef}
          className="hero-flow__progress"
          d={path}
          fill="none"
          pathLength={1}
        />
        {TRAIL.map((_, index) => (
          <circle
            key={index}
            ref={(el) => {
              trailRefs.current[index] = el
            }}
            className={`hero-flow__trail is-${index}`}
            r={index === 0 ? 3.2 : 2.4}
            cx="0"
            cy="0"
          />
        ))}
        <circle ref={signalRef} className="hero-flow__signal" r="4.4" cx="0" cy="0" />
        <circle ref={coreRef} className="hero-flow__core" r="1.6" cx="0" cy="0" />
      </svg>
    </div>
  )
}
