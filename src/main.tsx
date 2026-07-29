import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const resetInitialScroll = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

resetInitialScroll()
window.addEventListener('load', resetInitialScroll, { once: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
