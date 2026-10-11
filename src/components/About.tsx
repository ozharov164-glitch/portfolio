import { isConfigured, site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
import { useTilt } from '../lib/motion'
import { ExternalLink, TgLink } from './Chrome'

export function About() {
  const photoReady = isConfigured(site.photo)
  const tiltRef = useTilt(4)

  return (
    <section className="about" id="about">
      <header className="section-head">
        <p className="eyebrow">{site.about.eyebrow}</p>
        <h2>{site.about.headline}</h2>
      </header>
      <div className="about__grid">
        <div className={photoReady ? 'portrait is-photo' : 'portrait'} ref={tiltRef}>
          <img
            src={publicUrl(photoReady ? site.photo : '/media/brand/programmer-256.webp')}
            srcSet={
              photoReady
                ? undefined
                : `${publicUrl('/media/brand/programmer-128.webp')} 128w, ${publicUrl('/media/brand/programmer-256.webp')} 256w`
            }
            sizes={photoReady ? undefined : '160px'}
            alt={photoReady ? site.name : ''}
            width={photoReady ? 640 : 256}
            height={photoReady ? 800 : 256}
          />
        </div>
        <div>
          <p className="about__text">{site.about.text}</p>
          <ul className="facts">
            {site.about.facts.map((fact) => (
              <li key={fact.label}>
                <p className="mono">{fact.label}</p>
                <p>{fact.value}</p>
              </li>
            ))}
          </ul>
          <div className="about__links">
            {isConfigured(site.telegramUrl) ? <TgLink href={site.telegramUrl}>{site.hero.primaryCta}</TgLink> : null}
            {isConfigured(site.email) ? (
              <a className="btn btn-ghost" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            ) : null}
            {isConfigured(site.githubUrl) ? (
              <ExternalLink className="btn btn-ghost" href={site.githubUrl}>
                {site.footer.github}
              </ExternalLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
