import { aboutMe, githubUrl, linkedinUrl } from '../data'
import { GithubIcon, LinkedInIcon } from './Icons'

interface AboutProps {
  focused: boolean
}

export default function About({ focused }: AboutProps) {
  return (
    <section className={`section ${focused ? 'is-focused' : ''}`} id="about">
      <div className="section-head" data-reveal>
        <span className="section-num">01</span>
        <h2 className="section-title">About Me</h2>
      </div>
      <p className="about-text" data-reveal data-delay="100">
        {aboutMe}
      </p>
      <div className="btn-row" data-reveal data-delay="200">
        <a className="btn primary" href={githubUrl} target="_blank" rel="noreferrer">
          <GithubIcon />
          GitHub
        </a>
        <a className="btn" href={linkedinUrl} target="_blank" rel="noreferrer">
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </section>
  )
}
