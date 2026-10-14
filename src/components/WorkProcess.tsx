import { site } from '../content/site'
import { Icon, type IconName } from './icons/Icon'

const STEP_ICONS: IconName[] = ['send', 'smartphone', 'workflow', 'rocket']

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
          {site.process.steps.map((step, index) => (
            <li key={step.id} className="card-premium">
              <div className="steps__top">
                <p className="steps__num grad-text">{step.id}</p>
                {STEP_ICONS[index] ? (
                  <span className="icon-tile icon-tile--sm" aria-hidden="true">
                    <Icon name={STEP_ICONS[index]} size={20} />
                  </span>
                ) : null}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
