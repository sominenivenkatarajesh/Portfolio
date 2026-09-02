import React from 'react';
import Hero from '../components/Hero';
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ExternalLinkIcon,
  CodeIcon,
  ServerIcon,
  ShieldIcon,
  WrenchIcon,
  AwardIcon,
  GraduationIcon
} from '../components/Icons';

const categoryIcons = {
  Frontend: <CodeIcon size={20} color="var(--accent)" />,
  Backend: <ServerIcon size={20} color="var(--accent)" />,
  Cybersecurity: <ShieldIcon size={20} color="var(--accent)" />,
  Tools: <WrenchIcon size={20} color="var(--accent)" />
};

const Home = ({ data }) => {
  if (!data) return null;

  const {
    name,
    title,
    valueProposition,
    about,
    skills,
    projects,
    certifications,
    contact
  } = data;

  return (
    <div>
      {/* ── 1. HERO SECTION ───────────────────────────────── */}
      <Hero
        name={name}
        title={title || "MERN Stack Developer | Cybersecurity Enthusiast"}
        valueProposition={valueProposition}
        resumeUrl="/resume.pdf"
        githubUrl={contact?.github || "https://github.com/sominenivenkatarajesh"}
      />

      {/* ── 2. ABOUT SECTION ──────────────────────────────── */}
      <section id="about" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">01. Overview</span>
            <h2>About Me</h2>
          </div>

          <div
            className="card"
            style={{
              maxWidth: '860px',
              padding: '32px 36px',
            }}
          >
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '16px' }}>
              {about?.bio || "I am a MERN Stack Developer and Cybersecurity Enthusiast focused on building fast, scalable, and secure web applications. With hands-on expertise in modern React architectures, Node.js backend systems, and database design, I translate complex requirements into robust, high-performance software."}
            </p>
            <p style={{ fontSize: '1rem', lineHeight: '1.75', color: 'var(--text-secondary)', margin: 0 }}>
              I prioritize defensive programming, secure authentication, and optimized system performance in every project I architect—ensuring software is both resilient to threats and efficient at scale.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. SKILLS SECTION ─────────────────────────────── */}
      <section id="skills" className="section" style={{ backgroundColor: 'rgba(17, 24, 39, 0.4)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">02. Capabilities</span>
            <h2>Technical Skills</h2>
          </div>

          <div className="skills-grid">
            {skills && skills.map((group) => (
              <div key={group.category} className="card">
                <div className="skill-category-title">
                  {categoryIcons[group.category] || <CodeIcon size={20} color="var(--accent)" />}
                  <span>{group.category}</span>
                </div>
                <div className="skill-tags">
                  {group.items.map((item) => (
                    <span key={item} className="skill-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. PROJECTS SECTION ───────────────────────────── */}
      <section id="projects" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">03. Portfolio</span>
            <h2>Featured Projects</h2>
          </div>

          <div className="projects-grid">
            {projects && projects.map((project) => (
              <div key={project.id || project.title} className="project-card">
                <div className="project-header">
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    {project.subtitle && (
                      <div className="project-subtitle">{project.subtitle}</div>
                    )}
                  </div>
                </div>

                <p className="project-impact">
                  {project.impact || project.description}
                </p>

                <div className="skill-tags" style={{ margin: '4px 0 8px' }}>
                  {project.tech && project.tech.map((t) => (
                    <span
                      key={t}
                      className="skill-tag"
                      style={{ fontSize: '0.8rem', padding: '4px 10px' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-sm"
                    >
                      Live Demo
                      <ExternalLinkIcon size={14} color="#0a0e1a" />
                    </a>
                  )}

                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline btn-sm"
                    >
                      <GithubIcon size={15} color="var(--accent)" />
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CERTIFICATIONS SECTION ─────────────────────── */}
      <section id="certifications" className="section" style={{ backgroundColor: 'rgba(17, 24, 39, 0.4)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">04. Credentials</span>
            <h2>Certifications & Education</h2>
          </div>

          <div className="certifications-grid">
            {certifications && certifications.map((cert, idx) => (
              <div key={idx} className="cert-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {cert.type === 'Degree' ? (
                      <GraduationIcon size={20} color="var(--accent)" />
                    ) : (
                      <AwardIcon size={20} color="var(--accent)" />
                    )}
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--accent)'
                      }}
                    >
                      {cert.type || 'Certification'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>
                    {cert.title || cert.name}
                  </h3>

                  {cert.description && (
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      {cert.description}
                    </p>
                  )}
                </div>

                <div className="cert-meta">
                  <span>🏢 {cert.issuer}</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
                    🗓 {cert.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CONTACT SECTION ────────────────────────────── */}
      <section id="contact" className="section">
        <div className="container">
          <div className="contact-container">
            <div className="section-header" style={{ marginBottom: '16px' }}>
              <span className="section-label">05. Connect</span>
              <h2 style={{ marginBottom: '16px' }}>Get In Touch</h2>
              <p style={{ maxWidth: '520px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
                Interested in collaborating or discussing full-stack engineering and security? Feel free to connect.
              </p>
            </div>

            <div className="contact-icons">
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="contact-icon-btn"
                  title="Send Email"
                  aria-label="Email"
                >
                  <MailIcon size={22} color="currentColor" />
                </a>
              )}

              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-btn"
                  title="GitHub Profile"
                  aria-label="GitHub"
                >
                  <GithubIcon size={22} color="currentColor" />
                </a>
              )}

              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-btn"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={22} color="currentColor" />
                </a>
              )}
            </div>

            <div style={{ marginTop: '12px' }}>
              <a
                href={`mailto:${contact?.email || 'venkatrajeshnaidu@gmail.com'}`}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  letterSpacing: '0.02em',
                  fontFamily: 'monospace'
                }}
              >
                {contact?.email || 'venkatrajeshnaidu@gmail.com'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
