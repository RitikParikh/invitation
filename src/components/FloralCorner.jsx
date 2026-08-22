// Soft decorative bouquet cluster for a page corner, built from layered
// emoji so no external image assets are required. Pass flip to mirror
// it into the opposite corner.
export default function FloralCorner({ className = '', flip = false }) {
  return (
    <div
      className={`pointer-events-none select-none absolute w-60 h-60 sm:w-56 sm:h-56 ${className}`}
      style={{ transform: flip ? 'rotate(180deg)' : undefined }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          maskImage: 'radial-gradient(circle at 0 0, black 45%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 0 0, black 45%, transparent 75%)',
        }}
      >
        <span className="absolute top-1 left-3 text-4xl sm:text-6xl rotate-[-12deg] opacity-90">🤍</span>
        <span className="absolute top-6 left-10 text-3xl sm:text-5xl rotate-[8deg] opacity-90">🌸</span>
        <span className="absolute top-0 left-14 text-2xl sm:text-4xl rotate-[-6deg] opacity-80">🤍</span>
        <span className="absolute top-10 left-2 text-xl sm:text-3xl opacity-70">🌿</span>
        <span className="absolute top-16 left-8 text-lg sm:text-2xl opacity-60">🌿</span>
        <span className="absolute top-2 left-24 text-lg sm:text-2xl opacity-50">✿</span>
      </div>
    </div>
  )
}
