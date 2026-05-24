import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';

const Achievements = ({ data }) => {
  if (!data) return null;

  return (
    <PageContainer>
      <PageHeader title="Achievements" subtitle="Notable recognitions, awards, and accomplishments." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
        {data.achievements.map((ach, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🏆</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-bright)', marginBottom: '0.5rem' }}>
              {ach.title}
            </h3>
            <p style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.78rem', marginBottom: '1rem' }}>
              {ach.org} · {ach.year}
            </p>
            {ach.description && (
              <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem', lineHeight: '1.7' }}>
                {ach.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Achievements;
