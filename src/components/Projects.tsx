import { useRef } from 'react'
import { projects, githubUrl } from '../data'
import type { Project } from '../data'
import { ExternalIcon, GithubIcon } from './Icons'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <article
      ref={ref}
      className="project"
      data-reveal
      data-delay={String(100 + (index % 2) * 120)}
      onMouseMove={onMouseMove}
    >
      <div className="tags">
        {project.languages.split(',').map((lang) => (
          <span className="tag" key={lang.trim()}>
            {lang.trim()}
          </span>
        ))}
      </div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-desc">{project.description}</p>
      <div className="project-btns">
        {project.liveDemoUrl && (
          <button className="btn small">
            <ExternalIcon />
            Live Demo
          </button>
        )}
        <a className="btn small" href={githubUrl} target="_blank" rel="noreferrer">
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
        <span className="section-num">05</span>
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
