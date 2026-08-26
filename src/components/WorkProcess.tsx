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
        {site.process.steps.map((step, index) => (
          <li key={step.id} className="process__step">
            <ChromaIcon src={step.icon} alt="" className="process__icon" />
            <p className="process__num mono">{step.id}</p>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {index < site.process.steps.length - 1 ? (
              <span className="process__link" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ol>
      <p className="process__copy">{site.process.copy}</p>
    </section>
  )
}
