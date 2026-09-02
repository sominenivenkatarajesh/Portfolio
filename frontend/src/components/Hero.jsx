import React from 'react';
import { FileTextIcon, GithubIcon, ExternalLinkIcon } from './Icons';

const Hero = ({ name, title, valueProposition, resumeUrl, githubUrl }) => {
  return (
    <section id="hero" className="section" style={{ paddingTop: '120px', paddingBottom: '90px', position: 'relative' }}>
      {/* Subtle contrast backdrop behind hero text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(10, 14, 26, 0.85) 0%, rgba(10, 14, 26, 0.4) 50%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              fontSize: '0.85rem',
              fontWeight: 600,
              marginBottom: '24px',
              border: '1px solid rgba(34, 211, 238, 0.25)'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                display: 'inline-block'
              }}
            />
            {title || "MERN Stack Developer | Cybersecurity Enthusiast"}
          </div>

          <h1 style={{ marginBottom: '20px' }}>
            {name || "Somineni Venkata Rajesh"}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '680px'
            }}
          >
            {valueProposition || "Building resilient, high-performance web applications and secure backend systems with a focus on scalable architecture and clean code."}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href={resumeUrl || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              download="Somineni_Venkata_Rajesh_Resume.pdf"
              className="btn-primary"
            >
              <FileTextIcon size={18} />
              Resume PDF
            </a>

            <a
              href={githubUrl || "https://github.com/sominenivenkatarajesh"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <GithubIcon size={18} />
              GitHub
              <ExternalLinkIcon size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
