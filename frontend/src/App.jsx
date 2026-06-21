import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home.jsx'))
const Jee = lazy(() => import('./pages/Jee.jsx'))
const Mhtcet = lazy(() => import('./pages/Mhtcet.jsx'))
const Neet = lazy(() => import('./pages/Neet.jsx'))
const JeeAdvanced = lazy(() => import('./pages/JeeAdvanced.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Disclaimer = lazy(() => import('./pages/Disclaimer.jsx'))

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <LoadingSpinner size="lg" label="Loading page…" />
  </div>
)

// Scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

const DARK_STORAGE_KEY = 'examrank-dark-mode'

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const stored = localStorage.getItem(DARK_STORAGE_KEY)
      if (stored !== null) return stored === 'true'
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
  })

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem(DARK_STORAGE_KEY, String(darkMode))
    } catch {}
  }, [darkMode])

  const toggleDark = useCallback(() => setDarkMode((v) => !v), [])

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <ScrollToTop />
      <Navbar darkMode={darkMode} onToggleDark={toggleDark} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jee" element={<Jee />} />
            <Route path="/mhtcet" element={<Mhtcet />} />
            <Route path="/neet" element={<Neet />} />
            <Route path="/jee-advanced" element={<JeeAdvanced />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
