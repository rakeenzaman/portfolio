import { useEffect, useState } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import * as m from 'motion/react-m'
import Backdrop from './components/Backdrop'
import Hero from './components/Hero'
import Rail from './components/Rail'
import About from './components/About'
import Timeline from './components/Timeline'
import WorkSystems from './components/WorkSystems'
import Skills from './components/Skills'
import Projects from './components/Projects'
import { useActiveSection, useAtTopOfWindow } from './hooks/useActiveSection'
import { useReveal } from './hooks/useReveal'

const SECTIONS = [
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'What I Build' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(false)
  const [sectionFocusReady, setSectionFocusReady] = useState(false)
  const [sectionLinesReady, setSectionLinesReady] = useState(false)
  const atTop = useAtTopOfWindow()
  const { active, navigateToSection } = useActiveSection(SECTION_IDS, introComplete)
  useReveal(introComplete)

  useEffect(() => {
    if (!introComplete) return

    const focusTimer = window.setTimeout(() => setSectionFocusReady(true), 120)
    const lineTimer = window.setTimeout(() => setSectionLinesReady(true), 500)

    return () => {
      window.clearTimeout(focusTimer)
      window.clearTimeout(lineTimer)
    }
  }, [introComplete])

  return (
    <>
      <Backdrop />
      <Rail
        sections={SECTIONS}
        active={active}
        visible={!atTop}
        onNavigate={navigateToSection}
      />

      <main className="page">
        <Hero
          introComplete={introComplete}
          onIntroComplete={() => setIntroComplete(true)}
        />
        {introComplete && (
          <LazyMotion features={domAnimation} strict>
            <m.div
              className="site-content-shell"
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: contentExpanded ? 'visible' : 'hidden' }}
              onAnimationComplete={() => setContentExpanded(true)}
            >
              <m.div
                className={`site-content ${contentExpanded ? 'content-expanded' : ''} ${
                  sectionLinesReady ? 'section-lines-ready' : ''
                }`}
                initial={{ opacity: 0, y: 52, scale: 0.98, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.95,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <About focused={sectionFocusReady && active === 'about'} />
                <Timeline focusedSection={sectionFocusReady ? active : ''} />
                <WorkSystems focused={sectionFocusReady && active === 'work'} />
                <Skills focused={sectionFocusReady && active === 'skills'} />
                <Projects focused={sectionFocusReady && active === 'projects'} />
              </m.div>
            </m.div>
          </LazyMotion>
        )}
      </main>
    </>
  )
}
