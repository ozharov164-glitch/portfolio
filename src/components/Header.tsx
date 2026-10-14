import { useEffect, useId, useMemo, useRef, useState, type MouseEvent } from 'react'
import { configuredReviews, isConfigured, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { publicUrl } from '../lib/publicUrl'
import { useScrollSpy } from '../lib/scrollSpy'
import { TelegramMark } from './TelegramMark'
import { Icon } from './icons/Icon'

function focusable(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter(
    (node) => node.tabIndex !== -1,
  )
}

export function Header() {
  const telegramReady = isConfigured(site.telegramUrl)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [pill, setPill] = useState({ x: 0, y: 0, w: 0, h: 0, on: false })
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuId = useId()
  const reviewsReady = configuredReviews().length > 0
  const links = reviewsReady ? [...site.nav, { href: '#reviews', label: 'Отзывы' }] : [...site.nav]
  const sectionIds = useMemo(() => [...links.map((item) => item.href.slice(1)), 'contact'], [links])
  const { active, select } = useScrollSpy(sectionIds, 0.4)

  function goTo(id: string, event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    if (open) {
      setOpen(false)
      window.setTimeout(() => select(id), 200)
      return
    }
    select(id)
  }

  useEffect(() => {
    const sentinel = document.querySelector('.scroll-sentinel')
    if (!sentinel) return
    const observer = new IntersectionObserver(([entry]) => setScrolled(!(entry?.isIntersecting ?? true)))
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const current = nav.querySelector<HTMLElement>('a.is-active') ?? nav.querySelector<HTMLElement>('a')
    if (!current) return
    const parent = nav.getBoundingClientRect()
    const rect = current.getBoundingClientRect()
    setPill({
      x: rect.left - parent.left,
      y: rect.top - parent.top,
      w: rect.width,
      h: rect.height,
      on: true,
    })
  }, [active, links.length])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', open)
    if (!open) return
    const root = menuRef.current
    const opener = menuButtonRef.current
    const first = root ? focusable(root)[0] : undefined
    first?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !root) return
      const nodes = focusable(root)
      if (nodes.length === 0) return
      const index = nodes.indexOf(document.activeElement as HTMLElement)
      if (event.shiftKey && (index <= 0)) {
        event.preventDefault()
        nodes[nodes.length - 1]?.focus()
      } else if (!event.shiftKey && (index === -1 || index === nodes.length - 1)) {
        event.preventDefault()
        nodes[0]?.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('is-locked')
      opener?.focus()
    }
  }, [open])

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="site-header__bar">
        <a className="brand" href="#top">
          <img
            className="brand__mark"
            src={publicUrl('/media/brand/programmer-128.webp')}
            srcSet={`${publicUrl('/media/brand/programmer-64.webp')} 64w, ${publicUrl('/media/brand/programmer-128.webp')} 128w, ${publicUrl('/media/brand/programmer-256.webp')} 256w`}
            sizes="(min-width: 960px) 56px, 32px"
            alt=""
            width={64}
            height={64}
          />
          <span className="brand__text">
            <span className="brand__name">{site.name}</span>
            <span className="brand__role">{site.role}</span>
          </span>
        </a>

        <nav className="nav-desktop" aria-label="Разделы" ref={navRef}>
          <span
            className={pill.on ? 'nav-pill is-on' : 'nav-pill'}
            style={{
              transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
              width: pill.w,
              height: pill.h,
            }}
            aria-hidden="true"
          />
          {links.map((item) => {
            const id = item.href.slice(1)
            const current = active === id
            return (
              <a
                key={item.href}
                href={item.href}
                className={current ? 'is-active' : undefined}
                aria-current={current ? 'true' : undefined}
                onClick={(event) => goTo(id, event)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <div className="header-end">
          {telegramReady ? (
            <a
              className="btn btn-tg header-cta"
              href={site.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={spawnRipple}
            >
              <TelegramMark />
              <span>{site.hero.primaryCta}</span>
              <span className="sr-only"> (откроется в новой вкладке)</span>
            </a>
          ) : null}
          <button
            ref={menuButtonRef}
            type="button"
            className={open ? 'menu-toggle is-open' : 'menu-toggle'}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="menu-toggle__lines" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="sr-only">{open ? site.menu.close : site.menu.open}</span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        ref={menuRef}
        className={open ? 'menu is-open' : 'menu'}
        hidden={!open}
      >
        <nav className="menu__nav" aria-label="Разделы">
          {links.map((item, index) => {
            const id = item.href.slice(1)
            const current = active === id
            return (
              <a
                key={item.href}
                href={item.href}
                style={{ animationDelay: `${index * 70}ms` }}
                aria-current={current ? 'true' : undefined}
                onClick={(event) => goTo(id, event)}
              >
                {item.label}
              </a>
            )
          })}
        </nav>
        <div className="menu__foot">
          {telegramReady ? (
            <a
              className="btn btn-tg btn-lg"
              href={site.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              onPointerDown={spawnRipple}
            >
              <TelegramMark />
              <span>{site.hero.primaryCta}</span>
              <span className="sr-only"> (откроется в новой вкладке)</span>
            </a>
          ) : null}
          {isConfigured(site.email) ? (
            <p className="menu__mail">
              {site.contact.emailLead}{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          ) : null}
          <button type="button" className="menu__close" onClick={closeMenu}>
            <Icon name="x" size={24} />
            {site.menu.close}
          </button>
        </div>
      </div>
    </header>
  )
}
