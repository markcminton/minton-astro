// About is pure static markup — no useState/useEffect needed — so it stays
// a Server Component by default. Next.js renders it to HTML at build time.
export const metadata = {
  title: 'About — Mark Minton',
}

export default function AboutPage() {
  return (
    <div className="about-layout">

      <div className="about-intro">
        <h1>Mark Minton</h1>
        <p>
          <strong>AI Engineer &amp; Computer Vision Specialist</strong> based in Houston, Texas.
          I build machine learning systems that make sense of the world through imaging. When I am not writing code, I am either mountain biking or looking up at the stars.
        </p>
        <p>
          My professional work sits at the intersection of computer vision, infrared imaging, and
          data engineering. That same technical eye informs how I approach astrophotography:
          every capture is a calibration problem, every stack a signal-to-noise challenge.
        </p>
        <a
          href="https://buymeacoffee.com/markcminton"
          target="_blank"
          rel="noopener noreferrer"
          className="bmc-btn"
        >
          ☕ Buy Me a Coffee
        </a>
      </div>

      <div className="about-section">
        <h2>Career</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>AI Engineer — Honeywell</h3>
            <div className="tl-meta">Houston, TX &nbsp;·&nbsp; Nov 2020 – Jan 2026</div>
            <p>
              Fine-tuned computer vision algorithms for gas detection using OpenCV and Python,
              driving a $10M revenue increase. Maintained full-stack Linux servers (C++ ZMQ /
              Postgres / React) at 95%+ uptime, developed a CNN-based gas detector with TensorFlow
              &amp; Keras, built hyperspectral lens classification models with Sklearn, and
              overhauled customer-facing emissions reporting tools.
            </p>
          </div>
          <div className="timeline-item">
            <h3>Software Engineer — Emotion Robotics</h3>
            <div className="tl-meta">Houston, TX &nbsp;·&nbsp; Aug 2020 – Nov 2020</div>
            <p>
              Implemented real-time people detection on NVIDIA Jetson using ToF sensors and
              delivered custom elevator automation software to customers.
            </p>
          </div>
          <div className="timeline-item">
            <h3>Research Assistant — University of Houston Clear Lake</h3>
            <div className="tl-meta">Houston, TX &nbsp;·&nbsp; Jun 2019 – May 2020</div>
            <p>
              Studied infrared sensor calibration (NUC, ASA addressing) and designed image
              processing simulations for rectangular and hexagonal sampling in Matlab and Python.
            </p>
          </div>
          <div className="timeline-item">
            <h3>Engineering Intern — Infrared Cameras Inc.</h3>
            <div className="tl-meta">Beaumont, TX &nbsp;·&nbsp; May 2015 – Aug 2016</div>
            <p>
              Programmed Arduino control modules for camera calibration temperature loops,
              cutting lookup-table build time by 50%.
            </p>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>B.S. Computer Engineering</h3>
            <div className="tl-meta">University of Houston Clear Lake &nbsp;·&nbsp; 2015 – 2020</div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>Publication</h2>
        <div className="pub-card">
          <h3>
            Development of an algebraic nonuniformity correction algorithm for
            hexagonally-sampled infrared imagery
          </h3>
          <div className="pub-meta">SPIE &nbsp;·&nbsp; August 2020</div>
        </div>
      </div>

      <div className="about-section">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          {[
            'Python', 'C++', 'Matlab', 'PostgreSQL',
            'TensorFlow', 'Keras', 'OpenCV', 'Sklearn',
            'Numpy', 'Pandas', 'Scipy', 'Matplotlib',
            'React', 'TypeScript', 'Linux', 'Git',
            'ROS', 'ZMQ', 'Computer Vision', 'Machine Learning',
            'Hyperspectral Imaging', 'Gas Detection', 'Data Engineering',
          ].map((s) => (
            <span key={s} className="skill-tag">{s}</span>
          ))}
        </div>
      </div>

    </div>
  )
}
