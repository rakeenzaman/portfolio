import { skillCategories } from '../data'

export default function Skills({ focused }: { focused: boolean }) {
  return (
    <section className={`section ${focused ? 'is-focused' : ''}`} id="skills">
      <div className="section-head" data-reveal>
        <span className="section-num">05</span>
        <h2 className="section-title">Skills</h2>
      </div>

      <div className="skill-grid">
        {skillCategories.map((category, i) => (
          <article
            className={`skill-category ${category.wide ? 'skill-category-wide' : ''} ${
              category.description ? 'skill-category-ai' : ''
            }`}
            key={category.name}
            data-reveal
            data-delay={String(100 + i * 120)}
          >
            <div className="skill-category-head">
              <h3 className="skill-category-name">{category.name}</h3>
            </div>
            {category.description && (
              <p className="skill-category-desc">{category.description}</p>
            )}
            <div className="chips">
              {category.skills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
