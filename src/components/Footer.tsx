import { isConfigured, site } from '../content/site'

export function Footer() {
  const telegramReady = isConfigured(site.telegramUrl)
  const emailReady = isConfigured(site.email)
  const githubReady = isConfigured(site.githubUrl)

  return (
    <footer className="site-footer">
      <p className="site-footer__who">{site.footer.who}</p>
      <nav className="site-footer__links" aria-label="Подвал">
        {telegramReady ? (
          <a href={site.telegramUrl} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
        ) : (
          <span>Telegram</span>
        )}
        {githubReady ? (
          <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        ) : null}
        {emailReady ? <a href={`mailto:${site.email}`}>Email</a> : <span>Email</span>}
        <a href={`${import.meta.env.BASE_URL}privacy.html`}>{site.footer.privacy}</a>
        <a href={`${import.meta.env.BASE_URL}security.html`}>{site.footer.security}</a>
      </nav>
      <p className="site-footer__copy">{site.footer.copy}</p>
    </footer>
  )
}
