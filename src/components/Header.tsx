import { icons, isConfigured, site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
import { ChromaIcon } from './ChromaIcon'

export function Header() {
  const telegramReady = isConfigured(site.telegramUrl)

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <a className="brand" href="#top">
          <img
            className="brand__mark"
            src={publicUrl(site.brandMark)}
            alt=""
            width={1024}
            height={1024}
            sizes="(min-width: 1600px) 6.5rem, (min-width: 960px) 5rem, 3.45rem"
            decoding="async"
          />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__role">{site.role}</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Разделы">
          {site.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        {telegramReady ? (
          <a
            className="btn btn-accent btn-telegram"
            href={site.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ChromaIcon src={icons.telegram} alt="" />
            Написать в Telegram
          </a>
        ) : (
          <a className="btn btn-accent btn-telegram" href="#contact">
            <ChromaIcon src={icons.telegram} alt="" />
            Написать в Telegram
          </a>
        )}
      </div>

      <nav className="nav-mobile" aria-label="Разделы">
        {site.nav.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
