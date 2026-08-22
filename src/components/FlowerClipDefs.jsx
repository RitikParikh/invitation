// Hidden SVG that defines a single reusable 5-petal flower clip-path.
// Referenced anywhere via style={{ clipPath: 'url(#flower-clip)' }}.
export default function FlowerClipDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="flower-clip" clipPathUnits="objectBoundingBox">
          <circle cx="0.5" cy="0.16" r="0.36" />
          <circle cx="0.176" cy="0.39" r="0.36" />
          <circle cx="0.304" cy="0.77" r="0.36" />
          <circle cx="0.696" cy="0.77" r="0.36" />
          <circle cx="0.824" cy="0.39" r="0.36" />
          <circle cx="0.5" cy="0.5" r="0.26" />
        </clipPath>
      </defs>
    </svg>
  )
}
