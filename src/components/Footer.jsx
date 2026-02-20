export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="mailto:markcminton@gmail.com">markcminton@gmail.com</a>
        <a
          href="https://linkedin.com/in/mark-minton-026aa6ba"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Mark Minton. All images captured and processed by Mark Minton.
      </p>
    </footer>
  )
}
