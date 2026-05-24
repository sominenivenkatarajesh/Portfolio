import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ num, title }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
        fontWeight: 700,
        color: 'var(--text-bright)',
        whiteSpace: 'nowrap'
      }}
    >
      <span style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.9em', fontWeight: 400, marginRight: '0.5rem' }}>
        {num}.
      </span>
      {title}
    </motion.h2>
    <div style={{ flex: 1, height: '1px', background: 'rgba(100, 255, 218, 0.12)', marginLeft: '1.5rem' }} />
  </div>
);

export const PageHeader = ({ title, subtitle }) => (
  <header style={{ padding: '3rem 0 2.5rem', textAlign: 'left' }}>
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 800,
        color: 'var(--text-bright)',
        marginBottom: '0.75rem'
      }}
    >
      {title}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      style={{ color: 'var(--text-dim)', fontSize: '1rem', maxWidth: '600px', fontFamily: 'monospace' }}
    >
      {subtitle}
    </motion.p>
    <div style={{ height: '1px', background: 'rgba(100, 255, 218, 0.12)', marginTop: '2rem' }} />
  </header>
);

export const PageContainer = ({ children }) => (
  <div style={{
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 2rem 6rem',
  }}>
    {children}
  </div>
);
