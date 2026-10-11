import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { isConfigured, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { TelegramMark } from './TelegramMark'

export function ContactCTA() {
  const [toast, setToast] = useState('')
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const ready = isConfigured(site.telegramUrl)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    let frame = 0
    let x = 0
    let y = 0
    let cx = 0
    let cy = 0

    const paint = () => {
      frame = 0
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      button.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`
      if (Math.abs(x - cx) > 0.2 || Math.abs(y - cy) > 0.2) frame = window.requestAnimationFrame(paint)
    }

    const onMove = (event: PointerEvent) => {
      const rect = button.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(dx, dy)
      if (distance > 140) {
        x = 0
        y = 0
      } else {
        x = Math.max(-8, Math.min(8, dx * 0.15))
        y = Math.max(-8, Math.min(8, dy * 0.15))
      }
      if (!frame) frame = window.requestAnimationFrame(paint)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [ready])

  async function copyEmail(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
    event.preventDefault()
    try {
      await navigator.clipboard.writeText(site.email)
      setToast(site.contact.copied)
      window.setTimeout(() => setToast(''), 2200)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const accent = site.contact.headlineAccent
  const headline = site.contact.headline
  const cut = headline.indexOf(accent)

  return (
    <section className="cta" id="contact">
      <div className="cta__glow" aria-hidden="true" />
      <h2>
        {cut >= 0 ? (
          <>
            {headline.slice(0, cut)}
            <span className="grad-text">{headline.slice(cut, cut + accent.length)}</span>
            {headline.slice(cut + accent.length)}
          </>
        ) : (
          headline
        )}
      </h2>
      <p className="cta__text">{site.contact.text}</p>
      {ready ? (
        <a
          ref={buttonRef}
          className="btn btn-tg btn-xl"
          href={site.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={spawnRipple}
        >
          <TelegramMark />
          <span>{site.contact.primary}</span>
          <span className="sr-only"> (откроется в новой вкладке)</span>
        </a>
      ) : null}
      {isConfigured(site.email) ? (
        <p className="cta__mail">
          {site.contact.emailLead}{' '}
          <a href={`mailto:${site.email}`} onClick={copyEmail}>
            {site.email}
          </a>
        </p>
      ) : null}
      <p className="toast" role="status" aria-live="polite">
        {toast}
      </p>
    </section>
  )
}
