import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';

const Education = ({ data }) => {
  if (!data) return null;

  return (
    <PageContainer>
      <PageHeader title="Education" subtitle="My academic background and qualifications." />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
        {data.education.map((edu, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card"
            style={{ padding: '2rem 2.5rem', borderLeft: '3px solid var(--primary)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.4rem' }}>
                  {edu.school}
                </h3>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--primary)', fontWeight: 500, marginBottom: '0.4rem', fontStyle: 'italic' }}>
                  {edu.degree}
                </h4>
                <p style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  📍 {edu.location}
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <p style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                  {edu.period}
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  background: 'rgba(100, 255, 218, 0.08)',
                  border: '1px solid rgba(100, 255, 218, 0.2)',
                  borderRadius: '4px',
                  color: 'var(--primary)',
                  fontFamily: 'monospace',
                  fontSize: '0.78rem'
                }}>
                  {edu.grade}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Education;
