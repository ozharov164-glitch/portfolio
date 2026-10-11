import { useEffect, useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectStill } from '../content/projects'
import { site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
import { SoftImage } from './Chrome'

type LightboxProps = {
  slides: ProjectStill[]
  index: number
  origin: DOMRect | null
  onClose: () => void
  onIndex: (index: number) => void
}

function focusable(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])')]
}

export function Lightbox({ slides, index, origin, onClose, onIndex }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLElement>(null)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const slide = slides[index]
  const total = slides.length

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog || typeof document === 'undefined') return
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    focusable(dialog)[0]?.focus()
    return () => {
      document.body.style.overflow = previous
      opener?.focus()
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === 'ArrowRight') onIndex(Math.min(total - 1, index + 1))
      if (event.key === 'ArrowLeft') onIndex(Math.max(0, index - 1))
      if (event.key !== 'Tab') return
      const nodes = focusable(dialog)
      if (nodes.length === 0) return
      const at = nodes.indexOf(document.activeElement as HTMLElement)
      if (event.shiftKey && at <= 0) {
        event.preventDefault()
        nodes[nodes.length - 1]?.focus()
      } else if (!event.shiftKey && (at === -1 || at === nodes.length - 1)) {
        event.preventDefault()
        nodes[0]?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, onClose, onIndex, total])

  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame || !origin) return
    const dest = frame.getBoundingClientRect()
    const dx = origin.left + origin.width / 2 - (dest.left + dest.width / 2)
    const dy = origin.top + origin.height / 2 - (dest.top + dest.height / 2)
    const sx = Math.max(0.18, origin.width / Math.max(dest.width, 1))
    const sy = Math.max(0.18, origin.height / Math.max(dest.height, 1))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    frame.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
        { transform: 'translate(0px, 0px) scale(1, 1)' },
      ],
      { duration: 460, easing: 'cubic-bezier(.16, 1, .3, 1)' },
    )
  }, [origin])

  if (!slide || typeof document === 'undefined') return null

  function onPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    drag.current = { x: event.clientX, y: event.clientY }
  }

  function onPointerUp(event: ReactPointerEvent<HTMLElement>) {
    const start = drag.current
    drag.current = null
    if (!start) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (dy > 72 && Math.abs(dy) > Math.abs(dx)) {
      onClose()
      return
    }
    if (dx > 48) onIndex(Math.max(0, index - 1))
    else if (dx < -48) onIndex(Math.min(total - 1, index + 1))
  }

  return createPortal(
    <div className="lightbox" role="presentation">
      <button type="button" className="lightbox__backdrop" aria-label={site.projectsIntro.lightboxClose} onClick={onClose} />
      <div
        className="lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={slide.alt}
        ref={dialogRef}
      >
        <figure
          className="lightbox__frame"
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <SoftImage src={publicUrl(slide.src)} alt={slide.alt} width={slide.width} height={slide.height} />
          <figcaption>{slide.alt}</figcaption>
        </figure>
        <p className="lightbox__count">
          {index + 1} / {total}
        </p>
        <button type="button" className="lightbox__close" onClick={onClose}>
          {site.projectsIntro.lightboxClose}
          <span className="lightbox__esc">Esc</span>
        </button>
      </div>
    </div>,
    document.body,
  )
}
