import { useEffect, useState } from 'react'
import { isConfigured, site } from '../content/site'
import { spawnRipple } from '../lib/motion'
import { TelegramMark } from './TelegramMark'

export function FloatCta() {
  const [show, setShow] = useState(false)
  const ready = isConfigured(site.telegramUrl)

  useEffect(() => {
    const hero = document.querySelector('.hero .btn-tg')
    const cta = document.getElementById('contact')
    if (!hero || !cta) return

    let heroVisible = true
    let ctaVisible = false
    const sync = () => {
      const locked = document.documentElement.classList.contains('is-locked')
      setShow(!heroVisible && !ctaVisible && !locked)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroVisible = entry.isIntersecting
          if (entry.target === cta) ctaVisible = entry.isIntersecting
        }
        sync()
      },
      { threshold: 0.15 },
    )
    observer.observe(hero)
    observer.observe(cta)

    const classObserver = new MutationObserver(sync)
    classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      observer.disconnect()
      classObserver.disconnect()
    }
  }, [])

  if (!ready) return null

  return (
    <a
      className={show ? 'float-cta is-on' : 'float-cta'}
      href={site.telegramUrl}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={spawnRipple}
      tabIndex={show ? 0 : -1}
      aria-hidden={show ? undefined : true}
    >
      <TelegramMark />
      <span>{site.hero.primaryCta}</span>
      <span className="sr-only"> (откроется в новой вкладке)</span>
    </a>
  )
}
