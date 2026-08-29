import { site } from '../content/site'
import { LineIcon } from './LineIcon'

export function MoreWork() {
  return (
    <section className="more" id="more">
      <header className="section-head">
        <p className="eyebrow">{site.moreWork.eyebrow}</p>
        <h2>{site.moreWork.headline}</h2>
        <p className="lede">{site.moreWork.note}</p>
      </header>
      <ul className="more__grid">
        {site.moreWork.items.map((item) => (
          <li key={item.id} className="more__card">
            <LineIcon name={item.icon} className="more__icon" />
            <p className="mono more__kicker">{item.kicker}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <p className="more__stack">{item.stack}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
