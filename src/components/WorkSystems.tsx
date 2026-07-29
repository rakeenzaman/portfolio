import { workAreas, workResponsibilities } from '../data'

export default function WorkSystems({ focused }: { focused: boolean }) {
  return (
    <section className={`section ${focused ? 'is-focused' : ''}`} id="work">
      <div className="section-head" data-reveal>
        <span className="section-num">04</span>
        <h2 className="section-title">What I Build at Work</h2>
      </div>

      <p className="work-intro" data-reveal data-delay="80">
        My day-to-day work spans three main areas: Angular customer experiences and shared
        libraries, Spring Boot backends, and public-facing Next.js applications.
      </p>

      <div className="work-system-grid">
        {workAreas.map((area, index) => (
          <article
            className="work-system"
            key={area.name}
            data-reveal
            data-delay={String(140 + index * 90)}
          >
            <div className="work-system-topline">
              <span className="work-system-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="work-system-kind">{area.kind}</span>
            </div>
            <h3 className="work-system-name">{area.name}</h3>
            <p className="work-system-description">{area.description}</p>
            <ul className="work-area-examples">
              {area.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </article>
        ))}

        <div className="work-footnotes" aria-label="Other responsibilities">
          {workResponsibilities.map((responsibility, index) => (
            <article
              className="work-footnote"
              key={responsibility.name}
              data-reveal
              data-delay={String(440 + index * 70)}
            >
              <span className="work-footnote-mark" aria-hidden="true">
                *
              </span>
              <div>
                <h3 className="work-footnote-name">{responsibility.name}</h3>
                <p className="work-footnote-description">{responsibility.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
