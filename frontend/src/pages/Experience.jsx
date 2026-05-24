import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';
import InfoModal from '../components/InfoModal';

const Experience = ({ data }) => {
  const [selectedExp, setSelectedExp] = useState(null);
  if (!data) return null;

  return (
    <PageContainer>
      <PageHeader 
        title="Training & Internships" 
        subtitle="Professional training, internships, and industry experience in box layout." 
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem', 
        marginTop: '2rem' 
      }}>
        {data.experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-card"
            style={{ 
              padding: '2rem', 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%',
              borderTop: '3px solid var(--primary)'
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-bright)', margin: 0 }}>
                  {exp.title}
                </h3>
                <span style={{ fontSize: '1.5rem' }}>💼</span>
              </div>
              <p style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '0.9rem', margin: 0 }}>
                {exp.company}
              </p>
            </div>

            <p style={{ 
              color: 'var(--text-dim)', 
              fontSize: '0.9rem', 
              lineHeight: '1.6', 
              marginBottom: '2rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {exp.description}
            </p>

            <div style={{ 
              marginTop: 'auto', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(100, 255, 218, 0.1)'
            }}>
              <span style={{ color: 'var(--text-dim)', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                {exp.period}
              </span>
              <button 
                onClick={() => setSelectedExp(exp)}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(100, 255, 218, 0.1)'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <InfoModal 
        item={selectedExp} 
        isOpen={!!selectedExp} 
        onClose={() => setSelectedExp(null)} 
        type="experience"
      />
    </PageContainer>
  );
};

export default Experience;
