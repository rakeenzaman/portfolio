import { skillCategories } from '../data'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-head" data-reveal>
        <span className="section-num">03</span>
        <h2 className="section-title">Skills</h2>
      </div>
      <div className="skill-grid">
        {skillCategories.map((category, i) => (
          <div className="skill-category" key={category.name} data-reveal data-delay={String(100 + i * 120)}>
            <h3 className="skill-category-name">{category.name}</h3>
            <div className="chips">
              {category.skills.map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
