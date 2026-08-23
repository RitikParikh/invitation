import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { RevealProvider } from './lib/RevealContext'
import { LanguageProvider } from './lib/LanguageContext'
import { ROUTES, isInvitationPath } from './lib/routes'
import Invitation from './pages/Invitation'
import OurStory from './pages/OurStory'
import Gallery from './pages/Gallery'

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' },
}

// '/' hops to the invitation carrying the query string (?language=) and any hash
function RedirectToInvitation() {
  const { search, hash } = useLocation()
  return <Navigate to={`${ROUTES.invitation}${search}${hash}`} replace />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RedirectToInvitation />} />
        <Route
          path={ROUTES.invitation}
          element={
            <motion.div {...pageTransition}>
              <Invitation />
            </motion.div>
          }
        />
        {/* /invitation/u2 = bride first; other variants fall through to the default order */}
        <Route
          path={`${ROUTES.invitation}/:variant`}
          element={
            <motion.div {...pageTransition}>
              <Invitation />
            </motion.div>
          }
        />
        <Route
          path={ROUTES.story}
          element={
            <motion.div {...pageTransition}>
              <OurStory />
            </motion.div>
          }
        />
        <Route
          path={ROUTES.gallery}
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
  const isInvitation = isInvitationPath(location.pathname)

  return (
    <LanguageProvider>
      <RevealProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          {!isInvitation && <Footer />}
        </div>
      </RevealProvider>
    </LanguageProvider>
  )
}

export default App
