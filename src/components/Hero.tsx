import { projects } from '../content/projects'
import { isConfigured, projectsInTelegram, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { HeroPhone } from './HeroPhone'
import { Icon } from './icons/Icon'
import { TelegramMark } from './TelegramMark'

function titlePieces(word: string): string[] {
  const match = word.match(/^([\p{L}\p{N}]{7,})-([\p{L}\p{N}].*)$/u)
  if (!match?.[1] || !match[2]) return [word]
  return [`${match[1]}-`, match[2]]
}

function HeroTitle({ text, accent }: { text: string; accent: string }) {
  const marked = new Set(accent.split(/\s+/).map((word) => word.toLowerCase()))
  const words = text.split(' ')
  let pieceIndex = 0
  return (
    <h1>
      {words.map((word, index) => {
        const pieces = titlePieces(word)
        return pieces.map((piece, pieceAt) => {
          const delay = pieceIndex * 40
          pieceIndex += 1
          const bare = piece.replace(/[^\p{L}\p{N}-]/gu, '').toLowerCase()
          const accented = marked.has(bare)
          const lastPiece = pieceAt === pieces.length - 1
          const glue = pieces.length > 1 && pieceAt === 0
          return (
            <span className={glue ? 'rise-word is-glue' : 'rise-word'} key={`${piece}-${index}-${pieceAt}`}>
              <span
                className={accented ? 'rise-word__in grad-text' : 'rise-word__in'}
                style={{ animationDelay: `${delay}ms` }}
              >
                {piece}
                {lastPiece && index < words.length - 1 ? ' ' : ''}
              </span>
            </span>
          )
        })
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
            <span className="only-wide">{site.hero.secondaryCta}</span>
            <span className="only-narrow">{site.hero.secondaryCtaShort}</span>
            <Icon name="arrow-down" size={16} />
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
