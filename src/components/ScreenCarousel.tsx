import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import type { ProjectStill } from '../content/projects'
import { site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
import { SoftImage } from './Chrome'

type ScreenCarouselProps = {
  slides: ProjectStill[]
  onOpen: (index: number, origin: HTMLElement) => void
}

export function ScreenCarousel({ slides, onOpen }: ScreenCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const total = slides.length

  useEffect(() => {
    const track = trackRef.current
    if (!track || total < 2) return
    const items = [...track.querySelectorAll<HTMLElement>('.carousel__slide')]
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.6) continue
          const index = items.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActive(index)
        }
      },
      { root: track, threshold: [0.6] },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [total])

  function go(direction: -1 | 1) {
    const track = trackRef.current
    if (!track || total < 2) return
    const slide = track.querySelector<HTMLElement>('.carousel__slide')
    const width = slide?.offsetWidth ?? track.clientWidth
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * width, behavior: reduce ? 'auto' : 'smooth' })
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    }
  }

  return (
    <div className="carousel" role="region" aria-roledescription="карусель">
      <div
        className="carousel__track"
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKey}
      >
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            className="carousel__slide"
            aria-label={`Экран ${index + 1} из ${total}: ${slide.alt}`}
            onClick={(event) => onOpen(index, event.currentTarget)}
          >
            <SoftImage
              src={publicUrl(slide.src)}
              alt=""
              width={slide.width}
              height={slide.height}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </button>
        ))}
      </div>
      {total > 1 ? (
        <div className="carousel__nav">
          <button type="button" className="carousel__arrow carousel__arrow--prev" onClick={() => go(-1)}>
            <span className="sr-only">{site.projectsIntro.prev}</span>
          </button>
          <div className="carousel__dots">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                className={index === active ? 'is-active' : undefined}
                aria-current={index === active ? 'true' : undefined}
                aria-label={`Экран ${index + 1} из ${total}: ${slide.alt}`}
                onClick={() => {
                  const track = trackRef.current
                  const item = track?.querySelectorAll<HTMLElement>('.carousel__slide')[index]
                  item?.scrollIntoView({ inline: 'center', block: 'nearest' })
                }}
              />
            ))}
          </div>
          <button type="button" className="carousel__arrow carousel__arrow--next" onClick={() => go(1)}>
            <span className="sr-only">{site.projectsIntro.next}</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}
