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

/** Devices stay upright. The ref remains so frames keep a stable hook. */
export function useTilt(_maxDeg: number) {
  return useRef<HTMLDivElement>(null)
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
