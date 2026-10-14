import { useState, type ReactNode } from 'react'
import { site } from '../content/site'
import { FlashStack, PakoDesk, PakoMenu } from './illustrations/Craft'

function FlipSlot({
  front,
  back,
}: {
  front: ReactNode
  back: ReactNode
}) {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      className={flipped ? 'flip is-flipped' : 'flip'}
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
    >
      <span className="flip__inner">
        <span className="flip__face craft-slot">{front}</span>
        <span className="flip__face flip__back craft-slot">{back}</span>
      </span>
    </button>
  )
}

export function MoreWork() {
  const shift = site.moreWork.items[0]
  const guide = site.moreWork.items[1]
  const [cardFlip, setCardFlip] = useState(false)
  if (!shift || !guide) return null

  return (
    <section className="more" id="more">
      <header className="section-head">
        <p className="eyebrow">{site.moreWork.eyebrow}</p>
        <h2>{site.moreWork.headline}</h2>
        <p className="lede">{site.moreWork.note}</p>
      </header>
      <ul className="more__grid">
        <li className="more__card card-premium">
          <FlipSlot front={<PakoDesk />} back={<PakoMenu />} />
          <p className="kicker">{shift.kicker}</p>
          <h3>{shift.title}</h3>
          <p>{shift.text}</p>
          <p className="mono more__stack">{shift.stack}</p>
        </li>
        <li className="more__card card-premium">
          <button
            type="button"
            className="flip is-static"
            aria-pressed={cardFlip}
            onClick={() => setCardFlip((value) => !value)}
          >
            <span className="craft-slot">
              <FlashStack flipped={cardFlip} />
            </span>
          </button>
          <p className="kicker">{guide.kicker}</p>
          <h3>{guide.title}</h3>
          <p>{guide.text}</p>
          <p className="mono more__stack">{guide.stack}</p>
        </li>
      </ul>
    </section>
  )
}
