import type { ReactNode } from 'react'
import { site } from '../content/site'
import { useInView, useSpotlight } from '../lib/motion'

function OfferCard({
  id,
  title,
  text,
  children,
}: {
  id: string
  title: string
  text: string
  children: ReactNode
}) {
  const ref = useSpotlight<HTMLLIElement>()
  return (
    <li ref={ref} className={`offer__card is-${id}`}>
      <div className={`illus illus--${id}`} aria-hidden="true">
        {children}
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>
  )
}

export function Offer() {
  const [marqueeRef, marqueeOn] = useInView<HTMLDivElement>('80px')
  const cards = site.offer.cards

  return (
    <section className="offer" id="offer">
      <header className="section-head">
        <p className="eyebrow">{site.offer.eyebrow}</p>
        <h2>{site.offer.headline}</h2>
      </header>
      <ul className="offer__grid">
        {cards[0] ? (
          <OfferCard id={cards[0].id} title={cards[0].title} text={cards[0].text}>
            <span className="bubble bubble--user">Заявка</span>
            <span className="bubble bubble--bot">
              Ответ
              <i className="typing">
                <i />
                <i />
                <i />
              </i>
            </span>
          </OfferCard>
        ) : null}
        {cards[1] ? (
          <OfferCard id={cards[1].id} title={cards[1].title} text={cards[1].text}>
            <span className="illus-phone">
              <span className="illus-sheet" />
            </span>
          </OfferCard>
        ) : null}
        {cards[2] ? (
          <OfferCard id={cards[2].id} title={cards[2].title} text={cards[2].text}>
            <span className="illus-window">
              <i />
              <i />
              <i />
            </span>
          </OfferCard>
        ) : null}
      </ul>
      <p className="offer__aside">{site.offer.aside}</p>
      <div className={marqueeOn ? 'marquee' : 'marquee is-off'} ref={marqueeRef}>
        <div className="marquee__track">
          <p className="mono">{site.offer.marquee}</p>
          <p className="mono" aria-hidden="true">
            {site.offer.marquee}
          </p>
        </div>
      </div>
    </section>
  )
}
