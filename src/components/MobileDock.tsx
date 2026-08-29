import { isConfigured, site } from '../content/site'
import { TelegramMark } from './TelegramMark'

export function MobileDock() {
  const telegramReady = isConfigured(site.telegramUrl)

  return (
    <div className="mobile-dock">
      <a className="btn btn-ghost" href="#projects">
        {site.hero.primaryCtaShort}
      </a>
      {telegramReady ? (
        <a
          className="btn btn-primary btn-telegram mobile-dock__cta"
          href={site.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TelegramMark />
          {site.hero.secondaryCtaShort}
        </a>
      ) : (
        <a className="btn btn-primary btn-telegram mobile-dock__cta" href="#contact">
          <TelegramMark />
          {site.hero.secondaryCtaShort}
        </a>
      )}
    </div>
  )
}
