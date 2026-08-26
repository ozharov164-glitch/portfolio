import { site } from '../content/site'
import { ChromaIcon } from './ChromaIcon'

export function WorkProcess() {
  return (
    <section className="process" id="process">
      <header className="section-head">
        <p className="eyebrow">{site.process.eyebrow}</p>
        <h2>{site.process.headline}</h2>
      </header>
      <ol className="process__steps">
        {site.process.steps.map((step) => (
          <li key={step.id} className="process__step">
            <div className="process__head">
              <ChromaIcon src={step.icon} alt="" className="process__icon" />
              <p className="process__num mono">{step.id}</p>
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="process__copy">{site.process.copy}</p>
    </section>
  )
}
