import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';

const About = ({ data }) => {
  if (!data) return null;
  const { about, name } = data;

  return (
    <PageContainer>
      <PageHeader title="About Me" subtitle="Who I am and what drives my passion for technology." />

      <div className="about-grid" style={{ marginTop: '1rem' }}>
        {/* Text content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.85', marginBottom: '1.5rem' }}
          >
            {about.bio}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
            style={{ color: 'var(--text-dim)', fontSize: '1rem', lineHeight: '1.85', marginBottom: '2.5rem' }}
          >
            {about.bio2}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-bright)', marginBottom: '1.25rem', fontFamily: 'monospace' }}>
              Key Expertise
            </h3>
            <ul className="check-list" style={{ marginBottom: '3rem' }}>
              {about.expertise.map(exp => <li key={exp}>{exp}</li>)}
            </ul>
          </motion.div>

          {/* Highlights grid */}
          {about.highlights && (
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-bright)' }}>What I Do</h3>
                <div className="grid-responsive">
                  {about.highlights.map((h, i) => (
                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                      <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{h.icon}</div>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--text-bright)', fontWeight: 600, marginBottom: '0.4rem' }}>{h.label}</h4>
                      <p style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: '0.78rem' }}>{h.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.5 }}
          style={{ position: 'sticky', top: '120px' }}
        >
          <div style={{
            borderRadius: '6px',
            overflow: 'hidden',
            border: '2px solid var(--primary)',
            boxShadow: '8px 8px 0 var(--primary)',
            lineHeight: 0
          }}>
            <img
              src={about.profileImage}
              alt={name}
              style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block', filter: 'saturate(0.85)' }}
            />
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default About;
