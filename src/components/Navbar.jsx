import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReveal } from '../lib/RevealContext'
import { useLang } from '../lib/LanguageContext'
import LangSwitch from './LangSwitch'
import { ROUTES, isInvitationPath } from '../lib/routes'

const links = [
  { to: ROUTES.invitation, key: 'navHome' },
  { to: ROUTES.story, key: 'navStory' },
  { to: ROUTES.gallery, key: 'navGallery' },
]

export default function Navbar() {
  // the route the drawer was opened on — navigating anywhere else closes it for free
  const [openPath, setOpenPath] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const { pathname } = useLocation()
  const { revealed } = useReveal()
  const { t, couple, linkTo } = useLang()
  const isInvitation = isInvitationPath(pathname)
  const open = openPath === pathname

  // on the home page the nav holds back until the card is scratched open —
  // only the language switch stays reachable
  // const showNav = !isInvitation || revealed
  const showNav = !isInvitation

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${(scrolled || open) && showNav ? 'bg-cream/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3">
        {showNav ? (
          <NavLink to={linkTo(ROUTES.invitation)} className="font-display text-2xl sm:text-3xl text-maroon">
            {couple[0]} &amp; {couple[1]}
          </NavLink>
        ) : (
          <span />
        )}

        <div className="flex items-center gap-4 sm:gap-6">
          {/* desktop */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-8 font-heading text-lg">
              {links
                .filter((l) => l.to !== ROUTES.invitation)
                .map((l) => (
                  <NavLink
                    key={l.to}
                    to={linkTo(l.to)}
                    className={({ isActive }) =>
                      `transition-colors hover:text-gold ${isActive ? 'text-maroon font-semibold' : 'text-maroon-dark/80'
                      }`
                    }
                  >
                    {t(l.key)}
                  </NavLink>
                ))}
            </nav>
          )}

          <LangSwitch />

          {/* mobile toggle */}
          {showNav && (
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9"
              onClick={() => setOpenPath((p) => (p === pathname ? null : pathname))}
            >
              <span className={`block h-0.5 w-6 bg-maroon transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-maroon transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-maroon transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {open && showNav && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-cream border-t border-gold/30"
          >
            <div className="flex flex-col items-center gap-5 py-6 font-heading text-lg">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={linkTo(l.to)}
                  onClick={() => setOpenPath(null)}
                  className={({ isActive }) =>
                    `${isActive ? 'text-maroon font-semibold' : 'text-maroon-dark'} hover:text-gold`
                  }
                >
                  {t(l.key)}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
