import { useEffect, useState } from 'react'
import { projects, type ProjectId } from '../content/projects'
import { site } from '../content/site'
import { CaseScene } from './CaseScene'

export function Cases() {
  const [active, setActive] = useState<ProjectId>(projects[0]?.id ?? 'linktech')

  useEffect(() => {
    const nodes = projects
      .map((project) => document.getElementById(`case-${project.id}`))
      .filter((node): node is HTMLElement => node !== null)
    if (nodes.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const id = visible[0]?.target.id.replace('case-', '')
        if (id && projects.some((project) => project.id === id)) setActive(id as ProjectId)
      },
      { rootMargin: '-28% 0px -45% 0px', threshold: [0.2, 0.5] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const row = document.querySelector<HTMLElement>('.case-index__row')
    const chip = row?.querySelector<HTMLElement>(`[data-case="${active}"]`)
    if (!row || !chip) return
    const start = chip.offsetLeft
    const end = start + chip.offsetWidth
    if (start < row.scrollLeft || end > row.scrollLeft + row.clientWidth) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      chip.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduce ? 'auto' : 'smooth' })
    }
  }, [active])

  return (
    <section className="cases" id="projects">
      <header className="section-head wrap">
        <p className="eyebrow">{site.projectsIntro.eyebrow}</p>
        <h2>{site.projectsIntro.headline}</h2>
        <p className="lede">{site.projectsIntro.note}</p>
      </header>
      <nav className="case-index" aria-label="Кейсы">
        <div className="case-index__row">
          {projects.map((project) => {
            const current = project.id === active
            return (
              <a
                key={project.id}
                href={`#case-${project.id}`}
                data-case={project.id}
                aria-current={current ? 'true' : undefined}
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
