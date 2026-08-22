import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { wedding } from '../weddingConfig'

const links = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  { to: '/rsvp', label: 'RSVP & Gallery' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const isHome = location.pathname === '/'
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-cream/95 shadow-md backdrop-blur-sm' : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-8 py-3">
       {!isHome &&  <NavLink to="/" className="font-display text-2xl sm:text-3xl text-maroon">
         {wedding.groomFirst} &amp; {wedding.brideFirst}
        </NavLink> }

        {/* desktop */}
        {/* <nav className="hidden md:flex items-center gap-8 font-heading text-lg">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive ? 'text-maroon font-semibold' : scrolled ? 'text-maroon-dark/80' : 'text-maroon-dark'
                } hover:text-gold`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav> */}

        {/* mobile toggle */}
        {/* <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`block h-0.5 w-6 bg-maroon transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-maroon transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-maroon transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button> */}
      </div>

      <AnimatePresence>
        {open && (
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
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `${isActive ? 'text-maroon font-semibold' : 'text-maroon-dark'} hover:text-gold`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
