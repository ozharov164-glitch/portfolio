import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../content/projects'
import { isConfigured, site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
import { YoutubeMark } from './YoutubeMark'

type ProjectCaseProps = {
  project: Project
  phase: 'in' | 'out'
}

export function ProjectCase({ project, phase }: ProjectCaseProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [shot, setShot] = useState(project.poster)
  const [lightbox, setLightbox] = useState(false)
  const videoSrc = project.localVideo
  const hasVideo = isConfigured(videoSrc)
  const hasYoutube = isConfigured(project.youtubeUrl)
  const posterSrc = publicUrl(project.poster)
  const shotSrc = publicUrl(shot)
  const resolvedVideo = hasVideo && videoSrc ? publicUrl(videoSrc) : ''
  const hasGithub = isConfigured(project.githubUrl)
  const hasDemo = isConfigured(project.demoUrl)
  const hasSite = isConfigured(project.siteUrl)
  const activeStill = project.stills?.find((item) => item.src === shot)
  const shotAlt = activeStill?.alt ?? project.posterAlt
  const stills = project.stills ?? []

  useEffect(() => {
    if (!lightbox) return
    const previous = document.body.style.overflow
    const opener = openerRef.current
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightbox(false)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
      opener?.focus()
    }
  }, [lightbox])

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

  function openLightbox() {
    setLightbox(true)
  }

  function selectStill(src: string) {
    if (shot === src) {
      openLightbox()
      return
    }
    setShot(src)
  }

  const badgeClass = project.status === 'inactive' ? 'badge is-inactive' : 'badge'

  return (
    <article className={phase === 'out' ? 'case is-out' : 'case is-in'} aria-labelledby="case-title">
      <header className="case__head">
        <div className="case__meta">
          <span className="mono">{project.number}</span>
          <span className="case__meta-tags">
            <span className={badgeClass}>{project.statusLabel}</span>
            {hasYoutube ? (
              <a
                className="btn btn-watch"
                href={project.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeMark />
                <span>{site.projectsIntro.youtubeCta}</span>
              </a>
            ) : null}
          </span>
        </div>
        <h3 id="case-title" className="case__title">
          {project.title}
        </h3>
        <p className="case__one">{project.oneLiner}</p>
      </header>

      <div className="case__grid">
        <div className={`case-media-col is-${project.mediaKind}`}>
          <div className={`shot is-${project.mediaKind}`}>
            <div className="shot__stage">
              {hasVideo && resolvedVideo ? (
                <video
                  ref={videoRef}
                  className="shot__video"
                  poster={posterSrc}
                  preload="metadata"
                  controls={playing}
                  playsInline
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                >
                  {resolvedVideo.endsWith('.webm') ? (
                    <>
                      <source src={resolvedVideo} type="video/webm" />
                      <source src={resolvedVideo.replace(/\.webm$/, '.mp4')} type="video/mp4" />
                    </>
                  ) : (
                    <source src={resolvedVideo} type="video/mp4" />
                  )}
                </video>
              ) : (
                <button
                  ref={openerRef}
                  type="button"
                  className="shot__open"
                  onClick={openLightbox}
                  aria-haspopup="dialog"
                  aria-expanded={lightbox}
                  aria-label={`${site.projectsIntro.shotHint}. ${shotAlt}`}
                >
                  <img className="shot__img" src={shotSrc} alt={shotAlt} />
                </button>
              )}
            </div>
            {hasVideo && !playing ? (
              <button type="button" className="shot__play" onClick={() => void playVideo()}>
                Смотреть короткое демо
              </button>
            ) : null}
            {!hasVideo ? (
              <p className="shot__hint">
                <span className="shot__hint-mark" aria-hidden="true" />
                {site.projectsIntro.shotHint}
              </p>
            ) : null}
          </div>
          {stills.length > 1 ? (
            <div className={`stills is-${project.mediaKind}`} role="list">
              {stills.map((item) => (
                <button
                  key={item.src}
                  type="button"
                  className={shot === item.src ? 'stills__btn is-active' : 'stills__btn'}
                  onClick={() => selectStill(item.src)}
                  aria-label={
                    shot === item.src
                      ? `${item.alt}. ${site.projectsIntro.shotHint}`
                      : item.alt
                  }
                  aria-current={shot === item.src ? 'true' : undefined}
                >
                  <img src={publicUrl(item.src)} alt="" />
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

      {hasVideo || hasDemo || hasSite || hasGithub ? (
        <div className="case-actions">
          {hasVideo ? (
            <button type="button" className="btn btn-ghost" onClick={() => void playVideo()}>
              Смотреть короткое демо
            </button>
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
      ) : null}

      <p className="case__foot">{project.footnote}</p>

      {lightbox
        ? createPortal(
            <div className={`lightbox is-${project.mediaKind}`} role="presentation">
              <button
                type="button"
                className="lightbox__backdrop"
                aria-label={site.projectsIntro.lightboxClose}
                onClick={() => setLightbox(false)}
              />
              <div
                className="lightbox__dialog"
                role="dialog"
                aria-modal="true"
                aria-label={shotAlt}
              >
                <img className="lightbox__img" src={shotSrc} alt={shotAlt} />
                <p className="lightbox__cap">{shotAlt}</p>
                <button
                  ref={closeRef}
                  type="button"
                  className="lightbox__close"
                  onClick={() => setLightbox(false)}
                >
                  {site.projectsIntro.lightboxClose}
                  <span className="lightbox__esc">Esc</span>
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  )
}
