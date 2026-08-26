import { icons, isConfigured, site } from '../content/site'
import { ChromaIcon } from './ChromaIcon'

export function ContactCTA() {
  const telegramReady = isConfigured(site.telegramUrl)
  const emailReady = isConfigured(site.email)

  return (
    <section className="cta" id="contact">
      <div className="cta__glow" aria-hidden="true" />
      <p className="eyebrow">{site.contact.eyebrow}</p>
      <h2>{site.contact.headline}</h2>
      <p className="cta__text">{site.contact.text}</p>
      <div className="cta__actions">
        {telegramReady ? (
          <a
            className="btn btn-primary btn-telegram"
            href={site.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChromaIcon src={icons.telegram} alt="" />
            {site.contact.primary}
          </a>
        ) : (
          <span className="btn btn-primary is-pending" title="Заполните [[TELEGRAM_URL]] в src/content/site.ts">
            {site.contact.primary}
          </span>
        )}
        {emailReady ? (
          <a className="btn btn-ghost" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        ) : (
          <span className="btn btn-ghost is-pending" title="Заполните [[EMAIL]] в src/content/site.ts">
            {site.email}
          </span>
        )}
      </div>
    </section>
  )
}
