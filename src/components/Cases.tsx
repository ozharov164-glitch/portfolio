import { useEffect, useRef, type KeyboardEvent } from 'react'
import { projects, type ProjectId } from '../content/projects'
import { site } from '../content/site'
import { useScrollSpy } from '../lib/scrollSpy'
import { CaseScene } from './CaseScene'

const CASE_IDS = projects.map((project) => `case-${project.id}`)

export function Cases() {
  const { active, select } = useScrollSpy(CASE_IDS, 0.4)
  const rowRef = useRef<HTMLDivElement>(null)
  const activeId = active.replace('case-', '') as ProjectId

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const chip = row.querySelector<HTMLElement>(`[data-case="${activeId}"]`)
    if (!chip) return
    const pad = Number.parseFloat(getComputedStyle(row).paddingLeft) || 0
    const mask = 32
    const viewLeft = row.scrollLeft + pad
    const viewRight = row.scrollLeft + row.clientWidth - mask
    const chipLeft = chip.offsetLeft
    const chipRight = chipLeft + chip.offsetWidth
    if (chipLeft >= viewLeft - 1 && chipRight <= viewRight + 1) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    row.scrollTo({
      left: Math.max(0, chip.offsetLeft - pad),
      behavior: reduce ? 'auto' : 'smooth',
    })
  }, [activeId])

  function onRowKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    const chips = [...event.currentTarget.querySelectorAll<HTMLAnchorElement>('a[data-case]')]
    const index = chips.indexOf(document.activeElement as HTMLAnchorElement)
    if (index < 0) return
    const next = event.key === 'ArrowRight' ? index + 1 : index - 1
    const chip = chips[next]
    if (!chip) return
    event.preventDefault()
    for (const item of chips) item.tabIndex = -1
    chip.tabIndex = 0
    chip.focus()
  }

  return (
    <section className="cases" id="projects">
      <header className="section-head wrap">
        <p className="eyebrow">{site.projectsIntro.eyebrow}</p>
        <h2>{site.projectsIntro.headline}</h2>
        <p className="lede">{site.projectsIntro.note}</p>
      </header>
      <nav className="case-index" aria-label="Кейсы">
        <div className="case-index__row" ref={rowRef} onKeyDown={onRowKey}>
          {projects.map((project) => {
            const id = `case-${project.id}`
            const current = id === active
            return (
              <a
                key={project.id}
                href={`#${id}`}
                data-case={project.id}
                aria-current={current ? 'true' : undefined}
                tabIndex={current ? 0 : -1}
                onClick={(event) => select(id, event, 'h3')}
              >
                <span className="mono">{project.number}</span>
                {project.tab}
              </a>
            )
          })}
        </div>
      </nav>
      {projects.map((project, index) => (
        <CaseScene key={project.id} project={project} flip={index % 2 === 1} />
      ))}
    </section>
  )
}
