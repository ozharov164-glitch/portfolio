import { site } from '../content/site'
import { LineIcon } from './LineIcon'

export function PitchBand() {
  return (
    <section className="pitch" aria-labelledby="pitch-title">
      <header className="section-head">
        <p className="eyebrow">{site.pitch.eyebrow}</p>
        <h2 id="pitch-title">{site.pitch.headline}</h2>
      </header>
      <div className="pitch__grid">
        {site.pitch.cards.map((card) => (
          <article
            key={card.id}
            className={card.accent ? 'pitch__card pitch__card--after' : 'pitch__card'}
          >
            <LineIcon name={card.icon} />
            <p className="pitch__kicker">{card.kicker}</p>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
