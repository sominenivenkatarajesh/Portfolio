import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';
import InfoModal from '../components/InfoModal';

const Projects = ({ data }) => {
  const [selectedProject, setSelectedProject] = React.useState(null);
  if (!data) return null;

  return (
    <PageContainer>
      <PageHeader title="My Projects" subtitle="A showcase of my recent work, experiments, and technical deep-dives." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {data.projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 360px' : '360px 1fr',
              gap: '3rem',
              alignItems: 'center',
              padding: '3.5rem 0',
              borderBottom: '1px solid rgba(100, 255, 218, 0.07)'
            }}
          >
            {/* Text */}
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <p style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.78rem', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                Featured Project
              </p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '1.25rem' }}>
                {project.title}
              </h3>
              <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.9rem', lineHeight: '1.75' }}>
                  {project.description}
                </p>
              </div>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: '1.5rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem'
              }}>
                {project.points && project.points.map((point, idx) => (
                  <li key={idx} style={{ 
                    position: 'relative', 
                    paddingLeft: '1.25rem', 
                    fontSize: '0.85rem', 
                    color: 'var(--text-dim)',
                    lineHeight: '1.4'
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>▹</span>
                    {point}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
                {project.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                    style={{ color: 'var(--text-dim)', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.8rem', transition: 'color 0.3s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
                  >
                    GitHub ↗
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer"
                    style={{ color: 'var(--text-dim)', textDecoration: 'none', fontFamily: 'monospace', fontSize: '0.8rem', transition: 'color 0.3s' }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
                  >
                    Live Demo ↗
                  </a>
                )}
                <button 
                  onClick={() => setSelectedProject(project)}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid var(--primary)', 
                    color: 'var(--primary)', 
                    fontFamily: 'monospace', 
                    fontSize: '0.8rem', 
                    padding: '4px 12px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'rgba(100, 255, 218, 0.1)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Image */}
            <div style={{
              order: i % 2 === 0 ? 1 : 0,
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid rgba(100, 255, 218, 0.12)',
              lineHeight: 0,
              aspectRatio: '16/10'
            }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.65) brightness(0.8)', transition: 'all 0.4s ease' }}
                onMouseOver={e => { e.currentTarget.style.filter = 'saturate(1) brightness(1)'; e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseOut={e => { e.currentTarget.style.filter = 'saturate(0.65) brightness(0.8)'; e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <InfoModal 
        item={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        type="project"
      />
    </PageContainer>
  );
};

export default Projects;
