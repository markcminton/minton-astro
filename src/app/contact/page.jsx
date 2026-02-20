// 'use client' is required here because this component uses useState and
// browser event handlers (onSubmit). Without it, Next.js would try to render
// it on the server where those APIs don't exist.
'use client'

import { useState } from 'react'

const FORMSPREE_URL = 'https://formspree.io/f/xbdaawqo'

export default function ContactPage() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-layout">
      <div className="page-hero" style={{ padding: '3rem 0 0' }}>
        <h1>Get in Touch</h1>
        <p>Questions about a photo, professional work, or just want to talk about the stars?</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required placeholder="What's on your mind?" />
        </div>

        {status === 'success' && (
          <div className="form-status success">Message sent — I'll be in touch soon.</div>
        )}
        {status === 'error' && (
          <div className="form-status error">
            Something went wrong. Try emailing me directly at markcminton@gmail.com.
          </div>
        )}

        <button className="btn-submit" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
