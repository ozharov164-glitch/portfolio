import { useEffect, useRef, useState, type PointerEvent } from 'react'
import type { Project } from '../content/projects'
import { isConfigured } from '../content/site'

type ProjectCaseProps = {
  project: Project
  phase: 'in' | 'out'
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function canTilt(): boolean {
  return window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion()
}

export function ProjectCase({ project, phase }: ProjectCaseProps) {
  const tiltRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [shot, setShot] = useState(project.poster)
  const videoSrc = project.localVideo
  const hasVideo = isConfigured(videoSrc)
  const hasYoutube = isConfigured(project.youtubeUrl)
  const hasGithub = isConfigured(project.githubUrl)
  const hasDemo = isConfigured(project.demoUrl)
  const hasSite = isConfigured(project.siteUrl)

  useEffect(() => {
    setPlaying(false)
    setShot(project.poster)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }, [project.id, project.poster])

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const el = tiltRef.current
    if (!el || !canTilt()) return
    const box = el.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width - 0.5
    const py = (event.clientY - box.top) / box.height - 0.5
    el.style.transform = `perspective(1200px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg)`
  }

  function resetTilt() {
    const el = tiltRef.current
    if (el) el.style.transform = ''
  }

  async function playVideo() {
    const video = videoRef.current
    if (!video) return
    try {
      await video.play()
      setPlaying(true)
    } catch {
      setPlaying(false)
    }
  }

  const badgeClass = project.status === 'inactive' ? 'badge is-inactive' : 'badge'

  return (
    <article className={phase === 'out' ? 'case is-out' : 'case is-in'} aria-labelledby="case-title">
      <div className="case__frame" aria-hidden="true" />
      <header className="case__head">
        <p className="case__meta">
          <span className="mono">{project.number}</span>
          <span className={badgeClass}>{project.statusLabel}</span>
        </p>
        <h3 id="case-title" className="case__title">
          {project.title}
        </h3>
        <p className="case__one">{project.oneLiner}</p>
      </header>

      <div className="case__grid">
        <div className="case-media-col">
          <div
            className={`case-media is-${project.mediaKind}`}
            ref={tiltRef}
            onPointerMove={onPointerMove}
            onPointerLeave={resetTilt}
          >
            {hasVideo && videoSrc ? (
              <video
                ref={videoRef}
                className="case-media__video"
                poster={project.poster}
                preload="metadata"
                controls={playing}
                playsInline
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              >
                {videoSrc.endsWith('.webm') ? (
                  <>
                    <source src={videoSrc} type="video/webm" />
                    <source src={videoSrc.replace(/\.webm$/, '.mp4')} type="video/mp4" />
                  </>
                ) : (
                  <source src={videoSrc} type="video/mp4" />
                )}
              </video>
            ) : (
              <img className="case-media__poster" src={shot} alt={project.posterAlt} />
            )}
            {hasVideo && !playing ? (
              <button type="button" className="play-btn" onClick={() => void playVideo()}>
                <span className="play-btn__icon" aria-hidden="true" />
                Смотреть короткое демо
              </button>
            ) : null}
          </div>
          {project.stills && project.stills.length > 1 ? (
            <div className="stills" role="list">
              {project.stills.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className={shot === item.src ? 'stills__btn is-active' : 'stills__btn'}
                  onClick={() => setShot(item.src)}
                  aria-label={item.alt}
                >
                  <img src={item.src} alt="" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div className="case__side">
          <p className="case__side-label">Путь</p>
          <ol className="flow-line">
            {project.flow.map((step, index) => (
              <li key={step}>
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>

          <section className="case-block">
            <h4>Что решил</h4>
            <p>{project.whatSolved}</p>
          </section>
          <section className="case-block">
            <h4>Что построил</h4>
            <p>{project.whatBuilt}</p>
          </section>
          <section className="case-block">
            <h4>Моя зона</h4>
            <p>{project.ownership}</p>
          </section>
        </div>
      </div>

      <ul className="pills">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="case-actions">
        {hasVideo ? (
          <button type="button" className="btn btn-ghost" onClick={() => void playVideo()}>
            Смотреть короткое демо
          </button>
        ) : null}
        {hasYoutube ? (
          <a
            className="btn btn-ghost"
            href={project.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Запись на YouTube ↗
          </a>
        ) : null}
        {hasDemo ? (
          <a
            className="btn btn-ghost"
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.demoLabel ?? 'Открыть в Telegram ↗'}
          </a>
        ) : null}
        {hasSite ? (
          <a
            className="btn btn-ghost"
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.siteLabel ?? 'Сайт ↗'}
          </a>
        ) : null}
        {hasGithub ? (
          <a
            className="btn btn-ghost"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Код / GitHub ↗
          </a>
        ) : null}
      </div>

      <p className="case__foot">{project.footnote}</p>
    </article>
  )
}
