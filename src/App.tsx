import { useCallback, useRef, useState } from 'react'
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
  { id: 'timeline', label: 'Timeline' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

export default function App() {
  const atTop = useAtTopOfWindow()
  const active = useActiveSection(SECTION_IDS)
  useReveal()

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
        <Hero atTop={atTop} />
        <About onEmailCopied={showToast} />
        <Timeline />
        <Skills />
        <Projects />
      </main>
    </>
  )
}
