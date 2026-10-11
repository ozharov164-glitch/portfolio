import { useEffect, useRef } from 'react'
import { publicUrl } from '../lib/publicUrl'

export function SiteAtmosphere() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    let mx = window.innerWidth * 0.72
    let my = window.innerHeight * 0.2
    let cx = mx
    let cy = my
    let frame = 0

    const tick = () => {
      cx += (mx - cx) * 0.12
      cy += (my - cy) * 0.12
      node.style.setProperty('--mx', `${cx.toFixed(1)}px`)
      node.style.setProperty('--my', `${cy.toFixed(1)}px`)
      frame = window.requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      mx = event.clientX
      my = event.clientY
    }

    frame = window.requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const sync = () => root.classList.toggle('is-hidden', document.hidden)
    document.addEventListener('visibilitychange', sync)
    sync()
    return () => {
      document.removeEventListener('visibilitychange', sync)
      root.classList.remove('is-hidden')
    }
  }, [])

  const grain = publicUrl('/media/atmosphere/grain.png')

  return (
    <div
      className="atmosphere"
      ref={rootRef}
      aria-hidden="true"
      style={{ ['--grain' as string]: `url("${grain}")` }}
    >
      <div className="atmosphere__blob atmosphere__blob--tg" />
      <div className="atmosphere__blob atmosphere__blob--signal" />
      <div className="atmosphere__blob atmosphere__blob--deep" />
      <div className="atmosphere__grain" />
      <div className="atmosphere__spot" />
    </div>
  )
}
