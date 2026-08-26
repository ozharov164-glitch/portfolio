import { icons, isConfigured, site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
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
          <span className="btn btn-primary is-pending" title="Заполните ссылку Telegram в src/content/site.ts">
            {site.contact.primary}
          </span>
        )}
        {emailReady ? (
          <a className="btn btn-ghost" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        ) : (
          <span className="btn btn-ghost is-pending" title="Заполните почту в src/content/site.ts">
            {site.email}
          </span>
        )}
      </div>
      <p className="cta__legal">
        {site.contact.legal}{' '}
        <a href={publicUrl('privacy.html')}>{site.footer.privacy}</a>
        {' · '}
        <a href={publicUrl('terms.html')}>{site.footer.terms}</a>
      </p>
    </section>
  )
}
