import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ name, role, tagline, roles = [] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const cycleItems = roles.length > 0 
    ? roles.map(r => typeof r === 'string' ? { title: r, tagline: tagline } : r) 
    : [{ title: role, tagline: tagline }];

  useEffect(() => {
    if (cycleItems.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % cycleItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [cycleItems.length]);

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "'Inter', monospace",
            color: 'var(--primary)',
            fontSize: '1rem',
            fontWeight: 400,
            marginBottom: '1.5rem',
            letterSpacing: '0.05em'
          }}
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'var(--text-bright)',
            lineHeight: 1.1,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          {name}.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--text-dim)',
            lineHeight: 1.2,
            marginBottom: '2rem'
          }}
        >
          I am a{' '}
          <span style={{ color: 'var(--primary)', display: 'inline-flex', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTextIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {cycleItems[currentTextIndex]?.title}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            maxWidth: '540px',
            color: 'var(--text-dim)',
            fontSize: '1.05rem',
            lineHeight: '1.75',
            marginBottom: '3rem',
            minHeight: '80px'
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ margin: 0 }}
            >
              {cycleItems[currentTextIndex]?.tagline}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'Inter', monospace",
              color: 'var(--primary)',
              fontSize: '0.875rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'gap 0.3s ease'
            }}
            onMouseOver={e => e.currentTarget.style.gap = '0.7rem'}
            onMouseOut={e => e.currentTarget.style.gap = '0.4rem'}
          >
            Download CV <span style={{ fontSize: '1rem' }}>↓</span>
          </a>
          <a href="#contact" style={{
            fontFamily: "'Inter', monospace",
            color: 'var(--text-dim)',
            fontSize: '0.875rem',
            textDecoration: 'none',
            transition: 'color 0.3s'
          }}
            onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
          >
            Let's Talk →
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          opacity: 0.4
        }}
      >
        <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, var(--primary), transparent)' }} />
        <span style={{ fontFamily: 'monospace', fontSize: '0.6rem', color: 'var(--primary)', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
