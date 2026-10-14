import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'

type SelectEvent = MouseEvent | KeyboardEvent

function listFromKey(idsKey: string): string[] {
  return idsKey ? idsKey.split('|') : []
}

/**
 * Active id is the last element whose top is at or above a viewport line.
 * A lock ignores scroll updates until the programmatic scroll finishes.
 */
export function useScrollSpy(ids: readonly string[], line = 0.4) {
  const idsKey = ids.join('|')
  const [active, setActive] = useState(ids[0] ?? '')
  const lockRef = useRef<string | null>(null)
  const lockTimer = useRef(0)

  useEffect(() => {
    const list = listFromKey(idsKey)
    let raf = 0

    const compute = () => {
      raf = 0
      if (lockRef.current) return
      const lineY = window.innerHeight * line
      let best = list[0] ?? ''
      for (const id of list) {
        const node = document.getElementById(id)
        if (!node) continue
        if (node.getBoundingClientRect().top <= lineY) best = id
        else break
      }
      setActive((prev) => (prev === best ? prev : best))
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    compute()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.cancelAnimationFrame(raf)
      window.clearTimeout(lockTimer.current)
    }
  }, [idsKey, line])

  const select = useCallback((id: string, event?: SelectEvent, focusSelector?: string) => {
    event?.preventDefault()
    setActive(id)
    lockRef.current = id
    const node = document.getElementById(id)
    if (!node) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    node.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
    const hash = `#${id}`
    if (window.location.hash !== hash) history.replaceState(null, '', hash)

    const release = () => {
      lockRef.current = null
      window.clearTimeout(lockTimer.current)
      window.removeEventListener('scrollend', release)
    }

    window.addEventListener('scrollend', release, { once: true })
    lockTimer.current = window.setTimeout(release, 1200)
    if (focusSelector) node.querySelector<HTMLElement>(focusSelector)?.focus({ preventScroll: true })
  }, [])

  return { active, select }
}
