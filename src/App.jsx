import { useCallback, useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Envelope from './components/Envelope'
import MusicToggle from './components/MusicToggle'
import { wedding } from './weddingConfig'
import { RevealProvider } from './lib/RevealContext'
import { LanguageProvider } from './lib/LanguageContext'
import Home from './pages/Home'

// Everything lives on one scrolling page. The scratch-card invitation
// (pages/Invitation.jsx) is parked for now — add a route back to bring it in.
// Every path renders the page so old links (/invitation/u2, /our-story, …) keep working.
function App() {
  const [opened, setOpened] = useState(false)
  const handleOpened = useCallback(() => setOpened(true), [])

  // background music — only when musicUrl is set in weddingConfig
  const musicUrl = wedding.musicUrl?.trim()
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const playMusic = useCallback(() => {
    audioRef.current?.play().catch(() => setPlaying(false))
  }, [])
  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) playMusic()
    else audio.pause()
  }

  // pause while the guest is in another app/tab, pick up again when they come back
  useEffect(() => {
    if (!musicUrl) return
    let resume = false
    const onVisibility = () => {
      const audio = audioRef.current
      if (!audio) return
      if (document.hidden) {
        resume = !audio.paused
        audio.pause()
      } else if (resume) {
        playMusic()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [musicUrl, playMusic])

  return (
    <LanguageProvider>
      <RevealProvider>
        {/* the sealed envelope comes first; the page appears once it is opened */}
        {!opened && <Envelope onOpened={handleOpened} onTap={musicUrl ? playMusic : undefined} />}
        {musicUrl && (
          <audio
            ref={audioRef}
            src={musicUrl}
            loop
            preload="auto"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        )}
        {musicUrl && opened && <MusicToggle playing={playing} onToggle={toggleMusic} />}
        {opened && (
          <>
            <Navbar />
            <main>
              <Routes>
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
          </>
        )}
      </RevealProvider>
    </LanguageProvider>
  )
}

export default App
