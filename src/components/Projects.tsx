import { useEffect, useRef } from 'react'
import { projects } from '../data'
import type { Project } from '../data'
import { GithubIcon } from './Icons'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const frame = useRef(0)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    pointer.current = { x: e.clientX, y: e.clientY }
    if (frame.current) return

    frame.current = requestAnimationFrame(() => {
      frame.current = 0
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${pointer.current.x - rect.left}px`)
      el.style.setProperty('--my', `${pointer.current.y - rect.top}px`)
    })
  }

  return (
    <article
      ref={ref}
      className="project"
      data-reveal
      data-delay={String(100 + (index % 2) * 120)}
      onMouseMove={onMouseMove}
    >
      <div className="project-header">
        <div className="project-title-group">
          <h3 className="project-name">{project.name}</h3>
          <div className="tags">
            {project.languages.split(',').map((lang) => (
              <span className="tag" key={lang.trim()}>
                {lang.trim()}
              </span>
            ))}
          </div>
        </div>
        <time className="project-year" dateTime={String(project.year)}>
          {project.year}
        </time>
      </div>
      <p className="project-desc">{project.description}</p>
      <div className="project-btns">
        <a
          className="btn small"
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon />
          GitHub
        </a>
      </div>
    </article>
  )
}

export default function Projects({ focused }: { focused: boolean }) {
  return (
    <section className={`section ${focused ? 'is-focused' : ''}`} id="projects">
      <div className="section-head" data-reveal>
        <span className="section-num">06</span>
        <h2 className="section-title">Projects</h2>
      </div>
      <div className="project-grid">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
