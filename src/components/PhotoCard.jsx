'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'

export default function PhotoCard({ photo, index, onClick }) {
  const frameRef   = useRef(null)
  const wrapperRef = useRef(null)
  const isRight    = index % 2 === 1

  useEffect(() => {
    const frame   = frameRef.current
    const wrapper = wrapperRef.current
    if (!frame || !wrapper) return

    // Disable parallax on touch/coarse-pointer devices (phones, tablets)
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const onScroll = () => {
      const rect   = frame.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const diff   = center - window.innerHeight / 2
      // Translate the wrapper; scale(1.3) on the image provides headroom
      // so the background never shows through at the edges of travel.
      wrapper.style.transform = `translateY(${diff * 0.15}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`scroll-card ${isRight ? 'scroll-card--right' : 'scroll-card--left'}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${photo.title}`}
    >
      {/* ── Image column ── */}
      <div ref={frameRef} className="scroll-card-frame">
        {/* Wrapper receives the JS translateY for parallax.
            The Image's scale(1.3) gives ~135px of travel room at 82vh
            so the frame background never shows at the edges of movement.
            sizes="100vw" forces Next.js to serve the full-width resolution —
            necessary because objectFit:cover scales by height in this layout,
            which requires more pixels than the 62vw column width implies. */}
        <div ref={wrapperRef} className="scroll-card-parallax">
          <Image
            src={`/bestPics/${photo.file}`}
            alt={photo.title}
            fill
            sizes="100vw"
            quality={90}
            style={{ objectFit: 'cover', transform: 'scale(1.3)' }}
            priority={index < 2}
          />
        </div>
      </div>

      {/* ── Text column ── */}
      <div className="scroll-card-text">
        {/* Decorative ghost number — purely visual, aria-hidden */}
        <span className="scroll-card-num-ghost" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="scroll-card-num">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h2 className="scroll-card-title">{photo.title}</h2>
        <span className="scroll-card-subtitle">{photo.subtitle}</span>
        <span className="scroll-card-cta">View Details &rarr;</span>
      </div>
    </div>
  )
}
