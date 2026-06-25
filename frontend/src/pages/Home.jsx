import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../components/Hero';
import { SectionHeader } from '../components/Shared';
import { Link } from 'react-router-dom';
import InfoModal from '../components/InfoModal';

const Home = ({ data }) => {
  if (!data) return null;

  const [openProjectId, setOpenProjectId] = React.useState(null);
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [selectedExp, setSelectedExp] = React.useState(null);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay }
  });

  return (
    <div>
      <Hero name={data.name} role={data.role} tagline={data.tagline} roles={data.roles || [data.role]} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>

        {/* ── ABOUT ─────────────────────────────────────── */}
        <section id="about" style={{ padding: '6rem 0' }}>
          <SectionHeader num="01" title="About Me" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '4rem', alignItems: 'start' }}>
            <div>
              <motion.p {...fadeUp(0)} style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                {data.about.bio}
              </motion.p>
              <motion.p {...fadeUp(0.1)} style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {data.about.bio2}
              </motion.p>
              <motion.ul {...fadeUp(0.2)} className="check-list" style={{ marginBottom: '2.5rem' }}>
                {data.about.expertise.map(exp => (
                  <li key={exp}>{exp}</li>
                ))}
              </motion.ul>
              <motion.div {...fadeUp(0.3)}>
                <Link to="/about" className="btn-primary">Read More About Me</Link>
              </motion.div>
            </div>
            <motion.div {...fadeUp(0.15)} style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '6px',
                overflow: 'hidden',
                border: '2px solid var(--primary)',
                boxShadow: '6px 6px 0 var(--primary)',
                lineHeight: 0
              }}>
                <img
                  src={data.about.profileImage}
                  alt={data.name}
                  style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block', filter: 'saturate(0.85)' }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SKILLS ────────────────────────────────────── */}
        <section id="skills" style={{ padding: '6rem 0', overflow: 'hidden' }}>
          <SectionHeader num="02" title="Technical Skills" />
          
          <style>
            {`
              @keyframes scrollMarquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-container {
                display: flex;
                overflow: hidden;
                width: 100%;
                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
              }
              .marquee-content {
                display: flex;
                gap: 1.5rem;
                padding: 1rem 0;
                animation: scrollMarquee 30s linear infinite;
                width: max-content;
              }
              .marquee-content:hover {
                animation-play-state: paused;
              }
              .skill-box {
                padding: 0.75rem 1.5rem;
                border-radius: 8px;
                background: rgba(100, 255, 218, 0.05);
                border: 1px solid rgba(100, 255, 218, 0.2);
                color: var(--text-bright);
                font-size: 1rem;
                font-family: monospace;
                white-space: nowrap;
                transition: all 0.3s ease;
              }
              .skill-box:hover {
                background: rgba(100, 255, 218, 0.1);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(100, 255, 218, 0.1);
              }
            `}
          </style>

          <div className="marquee-container" style={{ marginBottom: '3rem' }}>
            <div className="marquee-content">
              {[...data.skills.flatMap(g => g.items), ...data.skills.flatMap(g => g.items)].map((item, index) => (
                <div key={`${item}-${index}`} className="skill-box">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center' }}>
            <Link to="/skills" style={{ 
              color: 'var(--primary)', 
              textDecoration: 'none', 
              fontFamily: 'monospace', 
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'opacity 0.2s',
              opacity: 0.9
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.9'}
            >
              Explore all skills ↗
            </Link>
          </motion.div>
        </section>

        {/* ── INTERNSHIPS & TRAINING ────────────────────── */}
        <section id="internships" style={{ padding: '6rem 0' }}>
          <SectionHeader num="03" title="Internships & Training" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {data.experience.slice(0, 3).map((exp, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card" style={{ padding: '2rem 2.5rem', borderLeft: '3px solid var(--primary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                      {exp.title}
                    </h3>
                    <p style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {exp.company}
                    </p>
                  </div>
                  <span style={{
                    color: 'var(--primary)',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    background: 'rgba(100, 255, 218, 0.06)',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    border: '1px solid rgba(100, 255, 218, 0.15)',
                    whiteSpace: 'nowrap'
                  }}>
                    {exp.period}
                  </span>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.75', marginBottom: '1.25rem' }}>
                  {exp.description}
                </p>
                <button 
                  onClick={() => setSelectedExp(exp)}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center' }}>
            <Link to="/experience" className="btn-primary">Explore More</Link>
          </motion.div>
        </section>

        {/* ── PROJECTS ──────────────────────────────────── */}
        <section id="projects" style={{ padding: '6rem 0' }}>
          <SectionHeader num="04" title="Featured Projects" />
          
          <style>
            {`
              .project-container {
                perspective: 1500px;
                margin-bottom: 4rem;
              }
              .project-card-3d {
                position: relative;
                width: 100%;
                min-height: 400px;
                transform-style: preserve-3d;
                transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
              }
              .project-card-3d:hover:not(.is-open) {
                transform: rotateX(5deg) rotateY(5deg);
              }
              .project-card-3d.is-open {
                transform: rotateY(180deg);
              }
              .card-face {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                background: var(--bg-light);
                border: 1px solid rgba(100, 255, 218, 0.1);
              }
              .card-front {
                z-index: 2;
              }
              .card-back {
                transform: rotateY(180deg);
                background: rgba(10, 25, 47, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: center;
                padding: 3rem;
                border: 1px solid var(--primary);
              }
              .project-points {
                list-style: none;
                padding: 0;
                margin: 1.5rem 0;
              }
              .project-points li {
                position: relative;
                padding-left: 1.5rem;
                margin-bottom: 0.75rem;
                color: var(--text-dim);
                font-size: 0.95rem;
                line-height: 1.5;
              }
              .project-points li::before {
                content: '▹';
                position: absolute;
                left: 0;
                color: var(--primary);
              }
              .tech-stack-back {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
                margin-top: 2rem;
              }
              .tech-tag-3d {
                font-family: monospace;
                font-size: 0.8rem;
                color: var(--primary);
                background: rgba(100, 255, 218, 0.1);
                padding: 4px 10px;
                border-radius: 4px;
              }
            `}
          </style>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {data.projects.slice(0, 3).map((project, i) => (
              <div key={project.id} className="project-container">
                <motion.div 
                  {...fadeUp(i * 0.1)}
                  className={`project-card-3d ${openProjectId === project.id ? 'is-open' : ''}`}
                  onClick={() => setOpenProjectId(openProjectId === project.id ? null : project.id)}
                >
                  {/* FRONT FACE */}
                  <div className="card-face card-front" style={{
                    display: 'grid',
                    gridTemplateColumns: i % 2 === 0 ? '1fr 450px' : '450px 1fr',
                    alignItems: 'stretch'
                  }}>
                    {/* Text Content */}
                    <div style={{ 
                      padding: '3rem', 
                      order: i % 2 === 0 ? 0 : 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}>
                      <p style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.8rem', marginBottom: '0.75rem', letterSpacing: '0.08em' }}>
                        Featured Project
                      </p>
                      <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '1.25rem' }}>
                        {project.title}
                      </h3>
                      <p style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <p style={{ color: 'var(--primary)', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                          Click to flip 3D ↺
                        </p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--primary)',
                            color: 'var(--primary)',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Image Side */}
                    <div style={{
                      order: i % 2 === 0 ? 1 : 0,
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'var(--primary)',
                        opacity: 0.2,
                        zIndex: 1,
                        transition: 'opacity 0.3s'
                      }} />
                      <img
                        src={project.image}
                        alt={project.title}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover', 
                          filter: 'grayscale(100%) contrast(1.1) brightness(0.7)',
                          transition: 'all 0.5s ease' 
                        }}
                      />
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div className="card-face card-back">
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.5rem' }}>
                      {project.title}
                    </h3>
                    <div style={{ width: '50px', height: '2px', background: 'var(--primary)', marginBottom: '2rem' }} />
                    
                    <ul className="project-points">
                      {project.points && project.points.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>

                    <div className="tech-stack-back">
                      {project.tech.map(t => (
                        <span key={t} className="tech-tag-3d">{t}</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem' }}>
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }} onClick={e => e.stopPropagation()}>
                          GitHub Code
                        </a>
                      )}
                      <button 
                        className="btn-primary" 
                        style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem' }} 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(project);
                        }}
                      >
                        Full Details ↗
                      </button>
                      <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.6rem 1.2rem', background: 'transparent', border: '1px solid var(--primary)' }}>
                        Close X
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          <InfoModal 
            item={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
            type="project"
          />

          <InfoModal 
            item={selectedExp} 
            isOpen={!!selectedExp} 
            onClose={() => setSelectedExp(null)} 
            type="experience"
          />

          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/projects" className="btn-primary">Explore More Projects</Link>
          </motion.div>
        </section>

        {/* ── CERTIFICATIONS ────────────────────────────── */}
        <section id="certifications" style={{ padding: '6rem 0' }}>
          <SectionHeader num="05" title="Training & Certifications" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {data.certifications.slice(0, 3).map((cert, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.08)}
                className="glass-card"
                style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '130px' }}
              >
                <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-bright)', margin: 0, padding: '0 2rem', lineHeight: '1.4' }}>
                    {cert.name}
                  </h3>
                  <a href="#" title="View Certificate" style={{ position: 'absolute', top: '-0.2rem', right: 0, textDecoration: 'none', fontSize: '1.4rem', transition: 'transform 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
                    📜
                  </a>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', borderTop: '1px solid rgba(100, 255, 218, 0.1)', paddingTop: '1rem' }}>
                  <span style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                    🏢 {cert.issuer}
                  </span>
                  <span style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 600 }}>
                    🗓 {cert.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center' }}>
            <Link to="/certifications" className="btn-primary">Explore More</Link>
          </motion.div>
        </section>

        {/* ── ACHIEVEMENTS ──────────────────────────────── */}
        <section id="achievements" style={{ padding: '6rem 0' }}>
          <SectionHeader num="06" title="Achievements" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {data.achievements.slice(0, 3).map((ach, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>🏆</span>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.5rem' }}>{ach.title}</h3>
                    <p style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '0.5rem' }}>{ach.org} · {ach.year}</p>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', lineHeight: '1.6' }}>{ach.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp(0.3)} style={{ textAlign: 'center' }}>
            <Link to="/achievements" className="btn-primary">Explore More</Link>
          </motion.div>
        </section>

        {/* ── EDUCATION ─────────────────────────────────── */}
        <section id="education" style={{ padding: '6rem 0' }}>
          <SectionHeader num="07" title="Education" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '0' }}>
            {data.education.map((edu, i) => (
              <motion.div
                key={i}
                {...fadeUp(i * 0.1)}
                className="glass-card"
                style={{ padding: '1.75rem 2rem', borderLeft: '3px solid var(--primary)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.3rem' }}>{edu.school}</h3>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '0.3rem' }}>{edu.degree}</p>
                    <p style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: '0.78rem' }}>{edu.location}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '0.3rem' }}>{edu.period}</p>
                    <p style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: '0.78rem' }}>{edu.grade}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ───────────────────────────────────── */}
        <section id="contact" style={{ padding: '6rem 0', textAlign: 'center' }}>
          <motion.p {...fadeUp(0)} style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            08. What's Next?
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text-bright)', marginBottom: '1.5rem' }}>
            Get In Touch
          </motion.h2>
          <motion.p {...fadeUp(0.2)} style={{ color: 'var(--text-dim)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: '1.75' }}>
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </motion.p>
          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${data.contact?.email}`} className="btn-primary" style={{ fontSize: '0.9rem' }}>
              Say Hello ✉
            </a>
            <Link to="/contact" className="btn-primary" style={{ fontSize: '0.9rem' }}>
              Contact Form
            </Link>
          </motion.div>
          <motion.div {...fadeUp(0.4)} style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem' }}>
            <a href={`mailto:${data.contact?.email}`} style={{ fontFamily: 'monospace', color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              {data.contact?.email}
            </a>
            <a href={`tel:${data.contact?.phone}`} style={{ fontFamily: 'monospace', color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              {data.contact?.phone}
            </a>
          </motion.div>
        </section>

      </div>
    </div>
  );
};

export default Home;
