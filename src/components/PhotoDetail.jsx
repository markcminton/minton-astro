'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

export default function PhotoDetail({ photo, onClose }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="detail-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Details for ${photo.title}`}
    >
      <div className="detail-inner" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {/* Image column */}
        <div className="detail-img-col">
          <Image
            src={`/${photo.file}`}
            alt={photo.title}
            fill
            sizes="(max-width: 768px) 100vw, 55vw"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>

        {/* Info column */}
        <div className="detail-info-col">
          <div className="detail-header">
            <h2>{photo.title}</h2>
            <span className="detail-subtitle">{photo.subtitle}</span>
          </div>

          <div className="detail-section">
            <div className="detail-section-label">Capture Story</div>
            <p>{photo.captureNotes}</p>
          </div>

          <div className="detail-section">
            <div className="detail-section-label">Technical Details</div>
            {photo.exposure || photo.filter || photo.software ? (
              <dl className="detail-tech-grid">
                {photo.exposure && (
                  <>
                    <dt className="detail-tech-label">Exposure</dt>
                    <dd className="detail-tech-value">{photo.exposure}</dd>
                  </>
                )}
                {photo.filter && (
                  <>
                    <dt className="detail-tech-label">Filter</dt>
                    <dd className="detail-tech-value">{photo.filter}</dd>
                  </>
                )}
                {photo.software && (
                  <>
                    <dt className="detail-tech-label">Software</dt>
                    <dd className="detail-tech-value">{photo.software}</dd>
                  </>
                )}
              </dl>
            ) : (
              <p>Details coming soon.</p>
            )}
          </div>

          <div className="detail-section">
            <div className="detail-section-label">About This Object</div>
            <p>{photo.objectInfo}</p>
          </div>

          <a
            href={photo.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-wiki-btn"
          >
            Wikipedia &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
