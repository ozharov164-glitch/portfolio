import { useState, type MouseEvent } from 'react'
import { isConfigured, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { TelegramMark } from './TelegramMark'

export function ContactCTA() {
  const [toast, setToast] = useState('')
  const ready = isConfigured(site.telegramUrl)

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
