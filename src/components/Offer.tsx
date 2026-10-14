import { site } from '../content/site'
import { useInView, useSpotlight } from '../lib/motion'
import { BotChat, MiniAppShot, SiteWindow } from './illustrations/Craft'
import { Icon, type IconName } from './icons/Icon'

const MARKS: IconName[] = ['message-circle', 'layout-panel-top', 'globe']
const TONES = ['icon-tile--tg', '', 'icon-tile--signal']
const ARTS = [BotChat, MiniAppShot, SiteWindow]

function OfferCard({
  index,
  id,
  title,
  text,
}: {
  index: number
  id: string
  title: string
  text: string
}) {
  const ref = useSpotlight<HTMLLIElement>()
  const Art = ARTS[index] ?? BotChat
  const mark = MARKS[index] ?? 'message-circle'
  return (
    <li ref={ref} className={`offer__card card-premium is-${id}`}>
      <span className={['icon-tile', TONES[index]].filter(Boolean).join(' ')}>
        <Icon name={mark} size={24} />
      </span>
      <div className="craft-slot" aria-hidden="true">
        <Art />
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
        {cards.map((card, index) => (
          <OfferCard key={card.id} index={index} id={card.id} title={card.title} text={card.text} />
        ))}
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
