import { useEffect, useState, type CSSProperties } from 'react'
import { isConfigured, site } from '../content/site'
import { publicUrl } from '../lib/publicUrl'
import { TelegramMark } from './TelegramMark'

const SECTION_IDS = site.nav.map((item) => item.href.replace('#', ''))

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const nodes = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target.id
        if (id) setActive(id)
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: [0.15, 0.35, 0.6] },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return active
}

function useScrollChrome() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 8)
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }

    const onScroll = () => {
      if (frame !== 0) return
      frame = window.requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== 0) window.cancelAnimationFrame(frame)
    }
  }, [])

  return { scrolled, progress }
}

export function Header() {
  const telegramReady = isConfigured(site.telegramUrl)
  const active = useActiveSection()
  const { scrolled, progress } = useScrollChrome()
  const chrome = { '--scroll': progress } as CSSProperties

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'} style={chrome}>
      <div className="site-header__bar">
        <a className="brand" href="#top">
          <img
            className="brand__mark"
            src={publicUrl(site.brandMark)}
            alt=""
            width={1024}
            height={1024}
            sizes="(min-width: 1600px) 6.5rem, (min-width: 960px) 5rem, 3.45rem"
            decoding="async"
          />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__role">{site.role}</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Разделы">
          {site.nav.map((item) => {
            const id = item.href.replace('#', '')
            const current = active === id
            return (
              <a
                key={item.href}
                href={item.href}
                className={current ? 'is-active' : undefined}
                aria-current={current ? 'location' : undefined}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {telegramReady ? (
          <a
            className="btn btn-accent btn-telegram"
            href={site.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TelegramMark />
            <span className="btn-telegram__full">Написать в Telegram</span>
            <span className="btn-telegram__short">Telegram</span>
          </a>
        ) : (
          <a className="btn btn-accent btn-telegram" href="#contact">
            <TelegramMark />
            <span className="btn-telegram__full">Написать в Telegram</span>
            <span className="btn-telegram__short">Telegram</span>
          </a>
        )}
      </div>

      <nav className="nav-mobile" aria-label="Разделы">
        {site.nav.map((item) => {
          const id = item.href.replace('#', '')
          const current = active === id
          return (
            <a
              key={item.href}
              href={item.href}
              className={current ? 'is-active' : undefined}
              aria-current={current ? 'location' : undefined}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  )
}
