'use client'

import { useState } from 'react'
import { photos } from '../data/photos'
import PhotoCard from './PhotoCard'
import PhotoDetail from './PhotoDetail'

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="page-hero">
        <h1>The Night Sky</h1>
        <p>Deep-sky objects captured all over East Texas.</p>
      </div>

      <div className="gallery-scroll">
        {photos.map((photo, i) => (
          <PhotoCard key={photo.file} photo={photo} index={i} onClick={() => setSelected(photo)} />
        ))}
      </div>

      {selected && (
        <PhotoDetail photo={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
