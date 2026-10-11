import { useEffect, useRef } from 'react'
import { site } from '../content/site'
import { useTilt } from '../lib/motion'

const STEP_MS = [1000, 1400, 1800, 1600, 2200, 4000] as const

export function HeroPhone() {
  const rootRef = useRef<HTMLDivElement>(null)
  const tiltRef = useTilt(6)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduce.matches) {
      root.dataset.step = '5'
      return
    }

    let step = 0
    let timer = 0
    let stopped = false
    root.dataset.step = '0'

    const arm = () => {
      window.clearTimeout(timer)
      if (stopped) return
      if (document.hidden || root.classList.contains('is-off')) {
        timer = window.setTimeout(arm, 240)
        return
      }
      const wait = STEP_MS[step] ?? 1200
      timer = window.setTimeout(() => {
        step = step >= 5 ? 0 : step + 1
        root.dataset.step = String(step)
        arm()
      }, wait)
    }

    arm()

    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle('is-off', !(entry?.isIntersecting ?? true)),
      { threshold: 0.2 },
    )
    observer.observe(root)

    const replay = () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      step = 0
      root.dataset.step = '0'
      arm()
    }
    root.addEventListener('click', replay)

    return () => {
      stopped = true
      window.clearTimeout(timer)
      observer.disconnect()
      root.removeEventListener('click', replay)
    }
  }, [])

  return (
    <div
      className="hero-phone"
      ref={rootRef}
      data-step="0"
      role="img"
      aria-label={site.hero.phoneLabel}
    >
      <div className="phone__tilt" ref={tiltRef}>
        <div className="phone phone--hero">
          <div className="phone__shell">
            <span className="phone__island" aria-hidden="true" />
            <div className="phone__screen" aria-hidden="true">
              <div className="tg">
                <header className="tg__bar">
                  <span className="tg__avatar" />
                  <span>
                    <strong>Ваш бот</strong>
                    <em>бот</em>
                  </span>
                </header>
                <div className="tg__log">
                  <p className="bubble bubble--user">Хочу оформить заказ</p>
                  <p className="typing" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </p>
                  <div className="bubble bubble--bot">
                    <p>Выберите раздел</p>
                    <div className="keys">
                      <span className="key key--catalog">Каталог</span>
                      <span className="key">Мои заказы</span>
                    </div>
                  </div>
                  <p className="bubble bubble--ok">
                    Заявка принята
                    <span className="check" aria-hidden="true">
                      <i className="check__short" />
                      <i className="check__long" />
                    </span>
                  </p>
                </div>
                <div className="sheet">
                  <span className="sheet__grab" />
                  <p className="sheet__title">Каталог</p>
                  <ul>
                    <li>Позиция 1</li>
                    <li>Позиция 2</li>
                    <li>Позиция 3</li>
                  </ul>
                  <span className="sheet__go">Оформить</span>
                </div>
              </div>
            </div>
            <span className="phone__glare" aria-hidden="true" />
          </div>
          <span className="phone__ground" aria-hidden="true" />
        </div>
      </div>
      <p className="phone__caption">{site.hero.phoneCaption}</p>
    </div>
  )
}
