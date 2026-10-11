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

/** Gentle device tilt. Writes rotateX/rotateY on the node; no layout reads in a scroll listener. */
export function useTilt(maxDeg: number) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    let frame = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let running = false

    const paint = () => {
      running = false
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      node.style.transform = `rotateX(${cx.toFixed(2)}deg) rotateY(${cy.toFixed(2)}deg)`
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        running = true
        frame = window.requestAnimationFrame(paint)
      }
    }

    const queue = () => {
      if (running) return
      running = true
      frame = window.requestAnimationFrame(paint)
    }

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      ty = px * maxDeg
      tx = -py * maxDeg
      queue()
    }

    const onLeave = () => {
      tx = 0
      ty = 0
      queue()
    }

    node.addEventListener('pointermove', onMove)
    node.addEventListener('pointerleave', onLeave)
    return () => {
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerleave', onLeave)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [maxDeg])

  return ref
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
