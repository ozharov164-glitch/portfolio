import { useEffect, useRef } from 'react'
import { site } from '../content/site'
import { ty } from '../lib/typograph'
import { useTilt } from '../lib/motion'
import { Icon } from './icons/Icon'

type Beat = {
  at: number
  show?: string
  hide?: string
  press?: boolean
  sheet?: boolean
}

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const SLIDE = 560

/** One beat at a time, top to bottom: greeting, reply, order, menu, Mini App, result. */
const BEATS: Beat[] = [
  { at: 520, show: 'greet' },
  { at: 1380, show: 'type-a' },
  { at: 2280, hide: 'type-a', show: 'help' },
  { at: 3280, show: 'order' },
  { at: 4080, show: 'type-b' },
  { at: 5020, hide: 'type-b', show: 'menu' },
  { at: 5880, press: true },
  { at: 6060, press: false, sheet: true },
  { at: 7680, sheet: false },
  { at: 8120, show: 'ok' },
]

const CLEAR_AT = 10600
const LOOP_AT = 11000

const SHOWN = ['greet', 'help', 'order', 'menu', 'ok']

export function HeroPhone() {
  const rootRef = useRef<HTMLDivElement>(null)
  const tiltRef = useTilt(6)

  useEffect(() => {
    const root = rootRef.current
    const log = root?.querySelector<HTMLElement>('.tg__log')
    if (!root || !log) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const showFinal = () => {
      for (const name of SHOWN) {
        log.querySelector(`[data-beat="${name}"]`)?.classList.add('is-in')
      }
    }
    if (reduce.matches) {
      showFinal()
      return
    }

    let stopped = false
    let timers: number[] = []

    const settle = (mutate: () => void) => {
      const kids = [...log.querySelectorAll<HTMLElement>('.tg__day, .is-in')]
      const before = kids.map((node) => node.getBoundingClientRect().top)
      mutate()
      kids.forEach((node, index) => {
        if (node.hidden || node.offsetParent === null) return
        const dy = before[index] - node.getBoundingClientRect().top
        if (Math.abs(dy) < 0.5) return
        node.animate([{ transform: `translateY(${dy}px)` }, { transform: 'translateY(0)' }], {
          duration: SLIDE,
          easing: EASE,
        })
      })
    }

    const apply = (beat: Beat) => {
      if (stopped) return
      settle(() => {
        if (beat.hide) log.querySelector(`[data-beat="${beat.hide}"]`)?.classList.remove('is-in')
        if (beat.show) log.querySelector(`[data-beat="${beat.show}"]`)?.classList.add('is-in')
        if (beat.press !== undefined) root.classList.toggle('is-press', beat.press)
        if (beat.sheet !== undefined) root.classList.toggle('is-sheet', beat.sheet)
      })
    }

    const reset = () => {
      root.classList.remove('is-sheet', 'is-press', 'is-clear')
      for (const node of log.querySelectorAll('.is-in')) node.classList.remove('is-in')
    }

    const arm = () => {
      for (const id of timers) window.clearTimeout(id)
      timers = []
      if (stopped) return
      if (document.hidden || root.classList.contains('is-off')) {
        timers.push(window.setTimeout(arm, 240))
        return
      }
      reset()
      for (const beat of BEATS) {
        timers.push(window.setTimeout(() => apply(beat), beat.at))
      }
      timers.push(
        window.setTimeout(() => {
          if (!stopped) root.classList.add('is-clear')
        }, CLEAR_AT),
      )
      timers.push(window.setTimeout(arm, LOOP_AT))
    }

    arm()

    const observer = new IntersectionObserver(
      ([entry]) => root.classList.toggle('is-off', !(entry?.isIntersecting ?? true)),
      { threshold: 0.2 },
    )
    observer.observe(root)

    const onHide = () => {
      if (document.hidden) {
        for (const id of timers) window.clearTimeout(id)
        timers = []
        return
      }
      arm()
    }
    document.addEventListener('visibilitychange', onHide)

    return () => {
      stopped = true
      for (const id of timers) window.clearTimeout(id)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onHide)
    }
  }, [])

  return (
    <div className="hero-phone" ref={rootRef} role="img" aria-label={site.hero.phoneLabel}>
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
                  <p className="bubble bubble--user" data-beat="greet">
                    {ty('Здравствуйте!')}
                  </p>
                  <p className="typing" data-beat="type-a" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </p>
                  <p className="bubble bubble--bot" data-beat="help">
                    {ty('Чем помочь?')}
                  </p>
                  <p className="bubble bubble--user" data-beat="order">
                    {ty('Хочу оформить заказ')}
                  </p>
                  <p className="typing" data-beat="type-b" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </p>
                  <div className="bubble bubble--bot" data-beat="menu">
                    <p>{ty('Выберите раздел')}</p>
                    <div className="keys">
                      <span className="key key--catalog">{ty('Каталог')}</span>
                      <span className="key">{ty('Мои заказы')}</span>
                    </div>
                  </div>
                  <p className="bubble bubble--ok" data-beat="ok">
                    {ty('Заявка принята')}
                    <span className="check" aria-hidden="true">
                      <svg className="check__svg" viewBox="0 0 24 24" width="20" height="20">
                        <circle cx="12" cy="12" r="11" className="check__bg" />
                        <path d="M7 12.5l3.2 3.2L17 9" className="check__mark" pathLength="1" />
                      </svg>
                    </span>
                  </p>
                </div>
                <span className="tg__scrim" aria-hidden="true" />
                <div className="sheet">
                  <span className="sheet__grab" />
                  <p className="sheet__title">{ty('Каталог')}</p>
                  <ul>
                    <li>{ty('Позиция 1')}</li>
                    <li>{ty('Позиция 2')}</li>
                    <li>{ty('Позиция 3')}</li>
                  </ul>
                  <span className="sheet__go">{ty('Оформить')}</span>
                </div>
              </div>
            </div>
            <span className="phone__glare" aria-hidden="true" />
          </div>
          <span className="phone__ground" aria-hidden="true" />
        </div>
      </div>
      <p className="phone__caption">
        <span className="phone__caption-label">{ty('Демонстрация')}</span>
        <span className="phone__caption-row">
          <span>{ty('бот')}</span>
          <Icon className="icon--mute" name="arrow-right" size={16} />
          <span>{ty('Mini App')}</span>
          <Icon className="icon--mute" name="arrow-right" size={16} />
          <span>{ty('результат')}</span>
        </span>
      </p>
    </div>
  )
}
