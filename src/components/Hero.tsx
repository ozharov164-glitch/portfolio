import { projects } from '../content/projects'
import { isConfigured, projectsInTelegram, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { HeroPhone } from './HeroPhone'
import { TelegramMark } from './TelegramMark'

function HeroTitle({ text, accent }: { text: string; accent: string }) {
  const marked = new Set(accent.split(/\s+/).map((word) => word.toLowerCase()))
  const words = text.split(' ')
  return (
    <h1>
      {words.map((word, index) => {
        const bare = word.replace(/[^\p{L}\p{N}-]/gu, '').toLowerCase()
        const accented = marked.has(bare)
        return (
          <span className="rise-word" key={`${word}-${index}`}>
            <span
              className={accented ? 'rise-word__in grad-text' : 'rise-word__in'}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {word}
              {index < words.length - 1 ? ' ' : ''}
            </span>
          </span>
        )
      })}
    </h1>
  )
}

export function Hero() {
  const telegramReady = isConfigured(site.telegramUrl)

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <p className="hero__badge">
          <span className="status-dot" aria-hidden="true" />
          {site.hero.eyebrow}
        </p>
        <HeroTitle text={site.hero.h1} accent={site.hero.h1Accent} />
        <p className="hero__sub">{site.hero.subtitle}</p>
        <div className="hero__actions">
          {telegramReady ? (
            <a
              className="btn btn-tg btn-lg"
              href={site.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={spawnRipple}
            >
              <TelegramMark />
              <span>{site.hero.primaryCta}</span>
              <span className="sr-only"> (откроется в новой вкладке)</span>
            </a>
          ) : null}
          <a className="btn btn-ghost btn-lg" href="#projects">
            {site.hero.secondaryCta}
          </a>
        </div>
        <p className="hero__trust">{projectsInTelegram(projects.length)}</p>
      </div>
      <div className="hero__stage">
        <HeroPhone />
      </div>
    </section>
  )
}
