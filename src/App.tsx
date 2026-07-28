import { useCallback, useRef, useState } from 'react'
import { LazyMotion, domAnimation, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import Backdrop from './components/Backdrop'
import Hero from './components/Hero'
import Rail from './components/Rail'
import About from './components/About'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Toast from './components/Toast'
import { useActiveSection, useAtTopOfWindow } from './hooks/useActiveSection'
import { useReveal } from './hooks/useReveal'

const SECTIONS = [
  { id: 'about', label: 'About Me' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)
  const [contentExpanded, setContentExpanded] = useState(false)
  const reduceMotion = useReducedMotion()
  const atTop = useAtTopOfWindow()
  const active = useActiveSection(SECTION_IDS, introComplete)
  useReveal(introComplete)

  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const showToast = useCallback(() => {
    setToastVisible(true)
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToastVisible(false), 5000)
  }, [])

  return (
    <>
      <Backdrop />
      <Rail sections={SECTIONS} active={active} visible={!atTop} />
      <Toast visible={toastVisible} />

      <main className="page">
        <Hero
          introComplete={introComplete}
          onIntroComplete={() => setIntroComplete(true)}
        />
        {introComplete && (
          <LazyMotion features={domAnimation} strict>
            <m.div
              className="site-content-shell"
              initial={reduceMotion ? false : { height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: reduceMotion ? 0 : 1.25, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: contentExpanded ? 'visible' : 'hidden' }}
              onAnimationComplete={() => setContentExpanded(true)}
            >
              <m.div
                className="site-content"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 52, scale: 0.98, filter: 'blur(8px)' }
                }
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: reduceMotion ? 0 : 0.95,
                  delay: reduceMotion ? 0 : 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <About focused={active === 'about'} onEmailCopied={showToast} />
                <Timeline focusedSection={active} />
                <Skills focused={active === 'skills'} />
                <Projects focused={active === 'projects'} />
              </m.div>
            </m.div>
          </LazyMotion>
        )}
      </main>
    </>
  )
}
