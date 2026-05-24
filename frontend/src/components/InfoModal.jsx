import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoModal = ({ item, isOpen, onClose, type = 'project' }) => {
  if (!item) return null;

  const isProject = type === 'project';
  const title = item.title;
  const subtitle = isProject ? 'Project Showcase' : 'Internship Detail';
  const mainImage = item.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200";

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'rgba(2, 12, 27, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
        onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#112240',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'rgba(10, 25, 47, 0.7)',
                border: '1px solid rgba(100, 255, 218, 0.3)',
                color: 'var(--primary)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                transition: 'all 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'rotate(90deg)'}
              onMouseOut={e => e.currentTarget.style.transform = 'rotate(0)'}
            >
              ×
            </button>

            {/* Content Container */}
            <div style={{ overflowY: 'auto', flex: 1, scrollbarWidth: 'thin' }}>
              {/* Header Image/Banner */}
              <div style={{ width: '100%', height: '380px', position: 'relative' }}>
                <img 
                  src={mainImage} 
                  alt={title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, transparent, #112240)'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '2.5rem',
                  left: '3rem',
                  right: '3rem'
                }}>
                   <p style={{ fontFamily: 'monospace', color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {subtitle}
                  </p>
                  <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--text-bright)', margin: 0, lineHeight: 1.1 }}>
                    {title}
                  </h2>
                  {!isProject && (
                    <p style={{ color: 'var(--primary)', fontSize: '1.2rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>
                      {item.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div style={{ padding: '3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                    {isProject && item.tech && item.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: 'var(--primary)',
                        background: 'rgba(100, 255, 218, 0.08)',
                        padding: '5px 14px',
                        borderRadius: '4px',
                        border: '1px solid rgba(100, 255, 218, 0.15)'
                      }}>
                        {t}
                      </span>
                    ))}
                    {!isProject && (
                       <span style={{
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: 'var(--primary)',
                        background: 'rgba(100, 255, 218, 0.08)',
                        padding: '5px 14px',
                        borderRadius: '4px',
                        border: '1px solid rgba(100, 255, 218, 0.15)'
                      }}>
                        {item.period}
                      </span>
                    )}
                  </div>
                  
                  {isProject && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {item.github && <a href={item.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-bright)', fontSize: '1.4rem' }}>⌥</a>}
                      {item.live && item.live !== "#" && <a href={item.live} target="_blank" rel="noreferrer" style={{ color: 'var(--text-bright)', fontSize: '1.4rem' }}>↗</a>}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '3rem' }}>
                  <h4 style={{ color: 'var(--primary)', fontFamily: 'monospace', marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>Overview</h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem', lineHeight: '1.8', margin: 0 }}>
                    {item.description}
                  </p>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <h4 style={{ color: 'var(--primary)', fontFamily: 'monospace', marginBottom: '1.5rem', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    {isProject ? 'Key Features & Implementation' : 'Key Contributions & Learning'}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {item.points && item.points.map((point, idx) => (
                      <li key={idx} style={{ 
                        position: 'relative', 
                        paddingLeft: '2.25rem', 
                        marginBottom: '1.25rem', 
                        color: 'var(--text-dim)', 
                        fontSize: '1rem',
                        lineHeight: '1.6'
                      }}>
                        <span style={{ position: 'absolute', left: 0, top: '0', color: 'var(--primary)', fontSize: '1.3rem' }}>▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(100, 255, 218, 0.1)' }}>
                  {isProject ? (
                    <>
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          View Code Base
                        </a>
                      )}
                      {item.live && item.live !== "#" && (
                        <a href={item.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
                          Live Application
                        </a>
                      )}
                    </>
                  ) : (
                    <button onClick={onClose} className="btn-primary">
                      Back to Portfolio
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InfoModal;
