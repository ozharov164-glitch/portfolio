import { useState } from 'react'
import { site } from '../content/site'

function FlipCard() {
  const [flipped, setFlipped] = useState(false)
  return (
    <button
      type="button"
      className={flipped ? 'flip is-flipped' : 'flip'}
      onClick={() => setFlipped((value) => !value)}
      aria-pressed={flipped}
    >
      <span className="flip__inner">
        <span className="flip__face browser">
          <span className="browser__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="quiz-card">Карточка блюда</span>
        </span>
        <span className="flip__face flip__back browser">
          <span className="browser__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="quiz-card">Проверка</span>
        </span>
      </span>
    </button>
  )
}

export function MoreWork() {
  const shift = site.moreWork.items[0]
  const guide = site.moreWork.items[1]
  if (!shift || !guide) return null

  return (
    <section className="more" id="more">
      <header className="section-head">
        <p className="eyebrow">{site.moreWork.eyebrow}</p>
        <h2>{site.moreWork.headline}</h2>
        <p className="lede">{site.moreWork.note}</p>
      </header>
      <ul className="more__grid">
        <li className="more__card">
          <div className="mini-phone" aria-hidden="true">
            <ul>
              <li>Позиция меню</li>
              <li>Позиция меню</li>
              <li>Напиток</li>
              <li>Напиток</li>
            </ul>
          </div>
          <p className="kicker">{shift.kicker}</p>
          <h3>{shift.title}</h3>
          <p>{shift.text}</p>
          <p className="mono more__stack">{shift.stack}</p>
        </li>
        <li className="more__card">
          <FlipCard />
          <p className="kicker">{guide.kicker}</p>
          <h3>{guide.title}</h3>
          <p>{guide.text}</p>
          <p className="mono more__stack">{guide.stack}</p>
        </li>
      </ul>
    </section>
  )
}
