import { skillCategories } from '../data'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-head" data-reveal>
        <span className="section-num">04</span>
        <h2 className="section-title">Skills</h2>
      </div>

      <div className="skill-grid">
        {skillCategories.map((category, i) => (
          <article
            className={`skill-category ${i === 0 ? 'skill-category-wide' : ''}`}
            key={category.name}
            data-reveal
            data-delay={String(100 + i * 120)}
          >
            <div className="skill-category-head">
              <h3 className="skill-category-name">{category.name}</h3>
            </div>
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
