import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { RevealProvider } from './lib/RevealContext'
import { LanguageProvider } from './lib/LanguageContext'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Gallery from './pages/Gallery'

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div {...pageTransition}>
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/our-story"
          element={
            <motion.div {...pageTransition}>
              <OurStory />
            </motion.div>
          }
        />
        <Route
          path="/gallery"
          element={
            <motion.div {...pageTransition}>
              <Gallery />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <LanguageProvider>
      <RevealProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          {!isHome && <Footer />}
        </div>
      </RevealProvider>
    </LanguageProvider>
  )
}

export default App
