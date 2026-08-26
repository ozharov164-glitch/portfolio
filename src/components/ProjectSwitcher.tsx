import { useEffect, useRef, useState } from 'react'
import { ProjectCase } from './ProjectCase'
import { getProject, projects, type ProjectId } from '../content/projects'
import { site } from '../content/site'

export function ProjectSwitcher() {
  const [activeId, setActiveId] = useState<ProjectId>(projects[0].id)
  const [shownId, setShownId] = useState<ProjectId>(projects[0].id)
  const [phase, setPhase] = useState<'in' | 'out'>('in')
  const timerRef = useRef<number | null>(null)

  const shown = getProject(shownId)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  function select(id: ProjectId) {
    if (id === activeId) return
    setActiveId(id)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShownId(id)
      setPhase('in')
      return
    }

    setPhase('out')
    if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      setShownId(id)
      setPhase('in')
    }, 190)
  }

  return (
    <section className="projects" id="projects">
      <header className="section-head">
        <p className="eyebrow">{site.projectsIntro.eyebrow}</p>
        <h2>{site.projectsIntro.headline}</h2>
        <p className="lede">{site.projectsIntro.note}</p>
      </header>

      <div className="tabs" role="tablist" aria-label="Проекты">
        {projects.map((project) => {
          const selected = project.id === activeId
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              id={`tab-${project.id}`}
              aria-selected={selected}
              aria-controls="project-panel"
              tabIndex={selected ? 0 : -1}
              className={selected ? 'tabs__btn is-active' : 'tabs__btn'}
              onClick={() => select(project.id)}
              onKeyDown={(event) => {
                const current = projects.findIndex((item) => item.id === activeId)
                if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                  event.preventDefault()
                  const next = projects[(current + 1) % projects.length]
                  select(next.id)
                  document.getElementById(`tab-${next.id}`)?.focus()
                } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                  event.preventDefault()
                  const prev = projects[(current - 1 + projects.length) % projects.length]
                  select(prev.id)
                  document.getElementById(`tab-${prev.id}`)?.focus()
                } else if (event.key === 'Home') {
                  event.preventDefault()
                  select(projects[0].id)
                  document.getElementById(`tab-${projects[0].id}`)?.focus()
                } else if (event.key === 'End') {
                  event.preventDefault()
                  const last = projects[projects.length - 1]
                  select(last.id)
                  document.getElementById(`tab-${last.id}`)?.focus()
                }
              }}
            >
              <span className="mono">{project.number}</span>
              {project.tab}
            </button>
          )
        })}
      </div>

      <div
        id="project-panel"
        role="tabpanel"
        aria-labelledby={`tab-${shown.id}`}
        className="projects__panel"
      >
        <ProjectCase project={shown} phase={phase} />
      </div>
    </section>
  )
}
