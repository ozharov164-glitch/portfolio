import { site } from '../content/site'
import { HeroFlow } from './HeroFlow'

export function WorkProcess() {
  return (
    <section className="process" id="process">
      <header className="section-head">
        <p className="eyebrow">{site.process.eyebrow}</p>
        <h2>{site.process.headline}</h2>
      </header>
      <div className="steps-wrap">
        <div className="steps__line" aria-hidden="true">
          <span className="steps__line-fill" />
        </div>
        <ol className="steps">
          {site.process.steps.map((step) => (
            <li key={step.id}>
              <p className="steps__num grad-text">{step.id}</p>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <HeroFlow />
    </section>
  )
}
