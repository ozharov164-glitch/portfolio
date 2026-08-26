import { site } from '../content/site'
import { ChromaIcon } from './ChromaIcon'

export function CapabilityGrid() {
  return (
    <section className="caps" id="capabilities">
      <header className="section-head">
        <p className="eyebrow">{site.capabilities.eyebrow}</p>
        <h2>{site.capabilities.headline}</h2>
      </header>
      <ul className="caps__grid">
        {site.capabilities.items.map((item) => (
          <li key={item.id} className={`caps__card signal-${item.signal}`}>
            <span className="caps__icon">
              <ChromaIcon src={item.icon} alt="" />
            </span>
            <h3>{item.title}</h3>
            <p>{item.result}</p>
          </li>
        ))}
      </ul>
      <p className="caps__stack">{site.capabilities.stackLine}</p>
    </section>
  )
}
