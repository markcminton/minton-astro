// No 'use client' here — we keep this as a Server Component and push
// interactivity down into the Gallery component which does need useState.
import Gallery from '../components/Gallery'

export const metadata = {
  title: 'Gallery — Mark Minton Astrophotography',
}

export default function GalleryPage() {
  return <Gallery />
}
