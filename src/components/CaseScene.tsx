import { useEffect, useState } from 'react'
import type { Project, ProjectStill } from '../content/projects'
import { visibleStack } from '../content/projects'
import { isConfigured, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { publicUrl } from '../lib/publicUrl'
import { DeviceLaptop } from './DeviceLaptop'
import { PhoneFrame } from './DevicePhone'
import { ExternalLink, SoftImage } from './Chrome'
import { Lightbox } from './Lightbox'
import { ScreenCarousel } from './ScreenCarousel'
import { TelegramMark } from './TelegramMark'
import { YoutubeMark } from './YoutubeMark'

function slidesOf(project: Project): ProjectStill[] {
  if (project.stills && project.stills.length > 0) return project.stills
  return [
    {
      src: project.poster,
      alt: project.posterAlt,
      width: project.posterWidth,
      height: project.posterHeight,
    },
  ]
}

function CountUp({ value }: { value: string }) {
  const target = Number(value)
  const [current, setCurrent] = useState(Number.isFinite(target) ? target : 0)

  useEffect(() => {
    if (!Number.isFinite(target)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const started = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 600)
      setCurrent(Math.round(target * (1 - (1 - progress) ** 3)))
      if (progress < 1) frame = window.requestAnimationFrame(tick)
    }
    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [target])

  if (!Number.isFinite(target)) return value
  return String(current).padStart(value.length, '0')
}

function OptbotStage({ project, onOpen }: { project: Project; onOpen: (origin: HTMLElement) => void }) {
  return (
    <div className="optbot">
      <PhoneFrame className="phone--case" label="Сценарий бота (интерфейс воссоздан для демонстрации)">
        <div className="tg tg--static" aria-hidden="true">
          <header className="tg__bar">
            <span className="tg__avatar" />
            <span>
              <strong>ОптБот</strong>
              <em>бот</em>
            </span>
          </header>
          <div className="tg__log">
            <p className="bubble bubble--bot">Каталог из Excel-прайса</p>
            <div className="keys">
              <span className="key">Поиск</span>
              <span className="key">Корзина</span>
            </div>
            <p className="bubble bubble--user">Оформить заявку</p>
            <p className="bubble bubble--bot">PDF-счёт готов</p>
            <p className="bubble bubble--ok">Уведомление менеджеру отправлено</p>
          </div>
        </div>
      </PhoneFrame>
      <button type="button" className="paper" onClick={(event) => onOpen(event.currentTarget)}>
        <SoftImage src={publicUrl(project.poster)} alt="" width={project.posterWidth} height={project.posterHeight} />
        <span className="sr-only">{project.posterAlt}</span>
      </button>
    </div>
  )
}

export function CaseScene({ project, flip }: { project: Project; flip: boolean }) {
  const slides = slidesOf(project)
  const [open, setOpen] = useState(false)
  const [shot, setShot] = useState(0)
  const [origin, setOrigin] = useState<DOMRect | null>(null)
  const stack = visibleStack(project.stack)
  const youtube = isConfigured(project.youtubeUrl)
  const demo = isConfigured(project.demoUrl)
  const siteLink = isConfigured(project.siteUrl)

  function openAt(index: number, element: HTMLElement) {
    const apply = () => {
      setShot(index)
      setOrigin(element.getBoundingClientRect())
      setOpen(true)
    }
    const view = document as Document & { startViewTransition?: (callback: () => void) => void }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduce && typeof view.startViewTransition === 'function') view.startViewTransition(apply)
    else apply()
  }

  const media =
    project.mediaKind === 'document' ? (
      <OptbotStage project={project} onOpen={(element) => openAt(0, element)} />
    ) : project.mediaKind === 'desktop' ? (
      <DeviceLaptop>
        <ScreenCarousel slides={slides} onOpen={openAt} />
      </DeviceLaptop>
    ) : project.mediaKind === 'poster' ? (
      <button type="button" className="poster-scene" onClick={(event) => openAt(0, event.currentTarget)}>
        <SoftImage
          src={publicUrl(project.poster)}
          alt={project.posterAlt}
          width={project.posterWidth}
          height={project.posterHeight}
        />
      </button>
    ) : (
      <PhoneFrame className={project.lofi ? 'phone--lofi' : 'phone--case'} tilt={4}>
        <ScreenCarousel slides={slides} onOpen={openAt} />
      </PhoneFrame>
    )

  return (
    <article
      className={flip ? 'case is-flip' : 'case'}
      id={`case-${project.id}`}
      aria-labelledby={`case-title-${project.id}`}
    >
      <div className="case__visual">{media}</div>
      <div className="case__copy">
        <div className="case__meta">
          <div className="case__identity">
            <p className="case__num grad-text">
              <CountUp value={project.number} />
            </p>
            <span className={`badge is-${project.status}`}>
              {project.status === 'live' ? <span className="status-dot" aria-hidden="true" /> : null}
              {project.statusLabel}
            </span>
            {youtube ? (
              <ExternalLink className="btn btn-watch" href={project.youtubeUrl ?? ''}>
                <YoutubeMark />
                <span>{site.projectsIntro.youtubeCtaShort}</span>
              </ExternalLink>
            ) : null}
          </div>
        </div>
        {demo || siteLink ? (
          <div className="case__links">
            {demo ? (
              <ExternalLink className="text-link" href={project.demoUrl ?? ''}>
                {project.demoLabel || site.projectsIntro.demoCta}
              </ExternalLink>
            ) : null}
            {siteLink ? (
              <ExternalLink className="text-link" href={project.siteUrl ?? ''}>
                {project.siteLabel}
              </ExternalLink>
            ) : null}
          </div>
        ) : null}
        <h3 id={`case-title-${project.id}`} tabIndex={-1}>
          {project.title}
        </h3>
        <dl className="case__facts">
          <div>
            <dt>{site.projectsIntro.task}</dt>
            <dd>{project.task}</dd>
          </div>
          <div>
            <dt>{site.projectsIntro.solution}</dt>
            <dd>{project.solution}</dd>
          </div>
          <div className="is-result">
            <dt>{site.projectsIntro.result}</dt>
            <dd>{project.result}</dd>
          </div>
        </dl>
        <ul className="tags">
          {stack.shown.map((item) => (
            <li key={item}>{item}</li>
          ))}
          {stack.extra > 0 ? <li>+{stack.extra}</li> : null}
        </ul>
        <details className="fold">
          <summary>{site.projectsIntro.details}</summary>
          <div className="fold__body">
            <p className="fold__label">{site.projectsIntro.flow}</p>
            <ol>
              {project.flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="fold__label">{site.projectsIntro.built}</p>
            <p>{project.built}</p>
            <p className="fold__label">{site.projectsIntro.role}</p>
            <p>{project.ownership}</p>
            <ul className="tags">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </details>
        <p className="case__note">{project.footnote}</p>
        {isConfigured(site.telegramUrl) ? (
          <a
            className="btn btn-line"
            href={site.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onPointerDown={spawnRipple}
          >
            <TelegramMark />
            <span>{site.projectsIntro.sameCta}</span>
            <span className="sr-only"> (откроется в новой вкладке)</span>
          </a>
        ) : null}
      </div>
      {open ? (
        <Lightbox
          slides={slides}
          index={shot}
          origin={origin}
          onClose={() => setOpen(false)}
          onIndex={setShot}
        />
      ) : null}
    </article>
  )
}
