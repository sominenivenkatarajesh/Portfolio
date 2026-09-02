import React, { useState, useEffect } from 'react';
import { MenuIcon, CloseIcon, FileTextIcon } from './Icons';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navbar */}
      <nav
        className="navbar"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 14, 26, 0.95)' : 'rgba(10, 14, 26, 0.8)',
          borderBottomColor: scrolled ? 'var(--border)' : 'transparent',
        }}
      >
        <div className="container">
          <div className="navbar-content">
            {/* Logo */}
            <a href="#hero" className="navbar-logo">
              SVR<span>.</span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="nav-links">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="nav-item">
                  {item.label}
                </a>
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Somineni_Venkata_Rajesh_Resume.pdf"
                className="btn-outline btn-sm"
              >
                <FileTextIcon size={15} />
                Resume
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-nav-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu open">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item"
                style={{ fontSize: '1rem', padding: '8px 0' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Somineni_Venkata_Rajesh_Resume.pdf"
              className="btn-primary btn-sm"
              style={{ marginTop: '8px' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileTextIcon size={15} />
              Resume PDF
            </a>
          </div>
        )}
      </nav>

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          padding: '36px 0',
          backgroundColor: 'var(--bg-primary)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} Somineni Venkata Rajesh · Built with React & Node.js
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
