import { site } from '../content/site'
import { HeroFlow } from './HeroFlow'
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
              <p className="steps__num grad-text">{step.id}</p>
              <h3>
                {STEP_ICONS[index] ? <Icon name={STEP_ICONS[index]} size={16} /> : null}
                <span>{step.title}</span>
              </h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
      <HeroFlow />
    </section>
  )
}
