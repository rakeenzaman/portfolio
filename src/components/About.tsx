import { aboutMe, contactEmail, githubUrl } from '../data'
import { AtIcon, GithubIcon } from './Icons'

interface AboutProps {
  focused: boolean
  onEmailCopied: () => void
}

export default function About({ focused, onEmailCopied }: AboutProps) {
  const emailClicked = () => {
    navigator.clipboard.writeText(contactEmail)
    onEmailCopied()
  }

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
        <button className="btn primary" onClick={emailClicked}>
          <AtIcon />
          Contact Me
        </button>
        <a className="btn" href={githubUrl} target="_blank" rel="noreferrer">
          <GithubIcon />
          GitHub
        </a>
      </div>
    </section>
  )
}
