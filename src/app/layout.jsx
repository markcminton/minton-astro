// In Next.js App Router, layout.jsx is the persistent shell around every page.
// next/font downloads fonts at build time and serves them locally — no external
// network request, no layout shift. Fonts generate CSS variables we can use in CSS.
import { Cormorant_Garamond, Inter } from 'next/font/google'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

export const metadata = {
  title: 'Mark Minton — Astrophotography',
  description: 'Deep-sky astrophotography portfolio of Mark Minton, Houston TX.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Applying both font CSS variables to the body */}
      <body className={`${cormorant.variable} ${inter.variable}`}>
        <div className="site-wrapper">
          <Navbar />
          <main className="site-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
