import React from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';

const Certifications = ({ data }) => {
  if (!data) return null;

  return (
    <PageContainer>
      <PageHeader title="Certifications" subtitle="Professional certifications and completed training programs." />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
        {data.certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass-card"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', minHeight: '130px' }}
          >
            <div style={{ position: 'relative', textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-bright)', margin: 0, padding: '0 2rem', lineHeight: '1.4' }}>
                {cert.name}
              </h3>
              <a href={cert.link || "#"} target={cert.link && cert.link !== "#" ? "_blank" : "_self"} rel="noopener noreferrer" title="View Certificate" style={{ position: 'absolute', top: '-0.2rem', right: 0, textDecoration: 'none', fontSize: '1.4rem', transition: 'transform 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.1)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
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
    </PageContainer>
  );
};

export default Certifications;
