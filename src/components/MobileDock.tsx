import { icons, isConfigured, site } from '../content/site'
import { ChromaIcon } from './ChromaIcon'

export function MobileDock() {
  const telegramReady = isConfigured(site.telegramUrl)

  return (
    <div className="mobile-dock">
      <a className="btn btn-ghost" href="#projects">
        {site.hero.primaryCta}
      </a>
      {telegramReady ? (
        <a
          className="btn btn-primary mobile-dock__cta"
          href={site.telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ChromaIcon src={icons.telegram} alt="" />
          {site.hero.secondaryCta}
        </a>
      ) : (
        <a className="btn btn-primary mobile-dock__cta" href="#contact">
          <ChromaIcon src={icons.telegram} alt="" />
          {site.hero.secondaryCta}
        </a>
      )}
    </div>
  )
}
