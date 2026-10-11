import { isConfigured, site } from '../content/site'
import { ExternalLink } from './Chrome'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer__row">
        <p>
          © {year} {site.name}
        </p>
        <nav aria-label="Подвал">
          {isConfigured(site.telegramUrl) ? (
            <ExternalLink href={site.telegramUrl}>{site.footer.telegram}</ExternalLink>
          ) : null}
          {isConfigured(site.email) ? <a href={`mailto:${site.email}`}>{site.footer.emailLabel}</a> : null}
          {isConfigured(site.githubUrl) ? (
            <ExternalLink href={site.githubUrl}>{site.footer.github}</ExternalLink>
          ) : null}
          <a href="privacy.html">{site.footer.privacy}</a>
          <a href="security.html">{site.footer.security}</a>
          <a href="terms.html">{site.footer.terms}</a>
        </nav>
      </div>
      <p className="site-footer__legal">{site.footer.legal}</p>
    </footer>
  )
}
