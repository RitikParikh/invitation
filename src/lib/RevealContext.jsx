import { createContext, useContext, useState } from 'react'

const RevealContext = createContext({ revealed: false, reveal: () => { } })

/** Tracks whether the guest has scratched the card open on the home page. */
export function RevealProvider({ children }) {
    const [revealed, setRevealed] = useState(false)
    return (
        <RevealContext.Provider value={{ revealed, reveal: () => setRevealed(true) }}>
            {children}
        </RevealContext.Provider>
    )
}

export const useReveal = () => useContext(RevealContext)
