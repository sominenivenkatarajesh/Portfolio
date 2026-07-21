import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'About', path: '/about', num: '01' },
  { label: 'Skills', path: '/skills', num: '02' },
  { label: 'Projects', path: '/projects', num: '03' },
  { label: 'Certifications', path: '/certifications', num: '04' },
  { label: 'Achievements', path: '/achievements', num: '05' },
  { label: 'Contact', path: '/contact', num: '06' },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        padding: scrolled ? '1rem 2.5rem' : '1.5rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        background: scrolled ? 'rgba(10, 25, 47, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(100, 255, 218, 0.08)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: '1.5rem',
            color: 'var(--primary)',
            letterSpacing: '-0.02em'
          }}>
            SVR<span style={{ color: 'var(--text-dim)' }}>.</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: "'Inter', monospace",
                fontSize: '0.82rem',
                textDecoration: 'none',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-dim)',
                transition: 'color 0.3s ease',
                letterSpacing: '0.02em'
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={e => {
                if (location.pathname !== link.path)
                  e.currentTarget.style.color = 'var(--text-dim)';
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ padding: '10px 18px', fontSize: '0.8rem' }}
          >
            Resume
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className={`mobile-nav-toggle ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu */}
        <div className={`mobile-nav-menu ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Inter', monospace",
                fontSize: '1.2rem',
                textDecoration: 'none',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-dim)',
                transition: 'color 0.3s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ marginTop: '1rem' }}
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </a>
        </div>
      </nav>

      {/* Page content */}
      <main style={{ paddingTop: '80px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(100, 255, 218, 0.08)',
      }}>
        <p style={{
          fontFamily: "'Inter', monospace",
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          Built with ❤️ by{' '}
          <span style={{ color: 'var(--primary)' }}>Somineni Venkata Rajesh</span>
          {' '}· React + Three.js
        </p>
      </footer>
    </div>
  );
};

export default Layout;
