import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';

const Skills = ({ data }) => {
  if (!data) return null;

  return (
    <PageContainer>
      <PageHeader title="Technical Skills" subtitle="Technologies, frameworks, and tools I work with daily." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {data.skills.map((group, i) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <h3 style={{
              fontFamily: 'monospace',
              color: 'var(--primary)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid rgba(100, 255, 218, 0.12)'
            }}>
              {group.category}
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {group.items.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.65rem', flexShrink: 0 }}>▹</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--text-dim)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Tools section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ marginTop: '3rem' }}
      >
        <h3 style={{
          fontFamily: 'monospace',
          color: 'var(--text-dim)',
          fontSize: '0.8rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          letterSpacing: '0.1em'
        }}>
          Core Technologies
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {data.skills.flatMap(g => g.items).map(item => (
            <span key={item} className="skill-tag">{item}</span>
          ))}
        </div>
      </motion.div>
    </PageContainer>
  );
};

export default Skills;
