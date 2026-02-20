// 'use client' is needed because usePathname reads the current URL at runtime,
// and useState manages the mobile menu open/close state.
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand" onClick={close}>
        Mark Minton <span>·</span> Astrophotography
      </Link>

      {/* Hamburger — only visible on mobile via CSS */}
      <button
        className="navbar-toggle"
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
      >
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
        <span className="navbar-toggle-bar" />
      </button>

      <ul className={`navbar-links${isOpen ? ' open' : ''}`}>
        <li>
          <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={close}>Gallery</Link>
        </li>
        <li>
          <Link href="/about" className={pathname === '/about' ? 'active' : ''} onClick={close}>About</Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === '/contact' ? 'active' : ''} onClick={close}>Contact</Link>
        </li>
      </ul>
    </nav>
  )
}
