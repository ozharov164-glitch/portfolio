import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type RefObject } from 'react'

export function useInView<T extends Element>(rootMargin = '0px'): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry?.isIntersecting ?? true),
      { rootMargin, threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin])

  return [ref, visible]
}

export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFine(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return fine
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return reduced
}

/** Tilt only for a fine pointer. Amplitude stays at or under 6 degrees. */
export function useTilt(maxDeg: number) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return
    const cap = Math.min(6, Math.max(0, maxDeg))
    let frame = 0
    let rx = 0
    let ry = 0

    const paint = () => {
      frame = 0
      node.style.setProperty('--rx', `${rx.toFixed(2)}`)
      node.style.setProperty('--ry', `${ry.toFixed(2)}`)
      node.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    }

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5
      const py = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5
      ry = px * cap * 2
      rx = -py * cap * 2
      if (!frame) frame = window.requestAnimationFrame(paint)
    }

    const reset = () => {
      rx = 0
      ry = 0
      node.style.transform = ''
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', reset)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', reset)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [maxDeg])

  return ref
}

export function useReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const nodes = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    if (reduce) {
      for (const node of nodes) node.dataset.shown = 'true'
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const target = entry.target as HTMLElement
          target.dataset.shown = 'true'
          observer.unobserve(target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    )
    for (const node of nodes) observer.observe(node)
    return () => observer.disconnect()
  }, [])
}

export function useMagnetic(selector: string) {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return
    const nodes = [...document.querySelectorAll<HTMLElement>(selector)]
    const cleanups: Array<() => void> = []

    for (const node of nodes) {
      let frame = 0
      let x = 0
      let y = 0
      const paint = () => {
        frame = 0
        node.style.transform = `translate(${x}px, ${y}px)`
      }
      const onMove = (event: PointerEvent) => {
        const rect = node.getBoundingClientRect()
        const dx = event.clientX - (rect.left + rect.width / 2)
        const dy = event.clientY - (rect.top + rect.height / 2)
        const limit = 6
        x = Math.max(-limit, Math.min(limit, dx / 8))
        y = Math.max(-limit, Math.min(limit, dy / 8))
        if (!frame) frame = window.requestAnimationFrame(paint)
      }
      const reset = () => {
        x = 0
        y = 0
        node.style.transform = ''
      }
      node.addEventListener('pointermove', onMove)
      node.addEventListener('pointerleave', reset)
      cleanups.push(() => {
        node.removeEventListener('pointermove', onMove)
        node.removeEventListener('pointerleave', reset)
        if (frame) window.cancelAnimationFrame(frame)
      })
    }

    return () => {
      for (const cleanup of cleanups) cleanup()
    }
  }, [selector])
}

export function spawnRipple(event: ReactPointerEvent<HTMLElement>) {
  if (event.pointerType === 'mouse') return
  const host = event.currentTarget
  const rect = host.getBoundingClientRect()
  const dot = document.createElement('span')
  dot.className = 'ripple'
  dot.style.left = `${event.clientX - rect.left}px`
  dot.style.top = `${event.clientY - rect.top}px`
  host.appendChild(dot)
  dot.addEventListener('animationend', () => dot.remove())
}

export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      node.style.setProperty('--x', `${x}px`)
      node.style.setProperty('--y', `${y}px`)
    }

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
      if (frame) return
      frame = window.requestAnimationFrame(paint)
    }

    node.addEventListener('pointermove', onMove)
    return () => {
      node.removeEventListener('pointermove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
