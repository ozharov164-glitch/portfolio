import { useEffect, useRef } from 'react'
import { site } from '../content/site'
import { ty } from '../lib/typograph'
import { useTilt } from '../lib/motion'
import { Icon } from './icons/Icon'

const MARKS = [
  { at: 450, step: '1' },
  { at: 900, step: '2' },
  { at: 1500, step: '3' },
  { at: 3100, step: '4' },
  { at: 4700, step: '5' },
] as const

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

    let stopped = false
    let timers: number[] = []
    root.dataset.step = '0'

    const arm = () => {
      for (const id of timers) window.clearTimeout(id)
      timers = []
      if (stopped) return
      if (document.hidden || root.classList.contains('is-off')) {
        timers.push(window.setTimeout(arm, 240))
        return
      }
      root.dataset.step = '0'
      for (const mark of MARKS) {
        timers.push(
          window.setTimeout(() => {
            if (!stopped) root.dataset.step = mark.step
          }, mark.at),
        )
      }
      timers.push(window.setTimeout(arm, 9000))
    }

    arm()

    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle('is-off', !(entry?.isIntersecting ?? true)),
      { threshold: 0.2 },
    )
    observer.observe(root)

    const replay = () => {
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
      arm()
    }
    root.addEventListener('click', replay)

    return () => {
      stopped = true
      for (const id of timers) window.clearTimeout(id)
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
                  <p className="tg__day">{ty('сегодня')}</p>
                  <p className="bubble bubble--seed bubble--user">{ty('Здравствуйте!')}</p>
                  <p className="bubble bubble--seed bubble--bot">{ty('Чем помочь?')}</p>
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
                      <svg className="check__svg" viewBox="0 0 24 24" width="20" height="20">
                        <circle cx="12" cy="12" r="11" className="check__bg" />
                        <path d="M7 12.5l3.2 3.2L17 9" className="check__mark" pathLength="1" />
                      </svg>
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
      <p className="phone__caption">
        {ty('Демонстрация: бот')} <Icon className="icon--mute" name="arrow-right" size={16} /> {ty('Mini App')}{' '}
        <Icon className="icon--mute" name="arrow-right" size={16} /> {ty('результат')}
      </p>
    </div>
  )
}
