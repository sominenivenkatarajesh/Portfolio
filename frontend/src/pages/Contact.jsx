import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader, PageContainer } from '../components/Shared';

const Contact = ({ data, standalone = true }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('✓ Message sent! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send. Please try again.');
      }
    } catch {
      setStatus('An error occurred. Please email directly.');
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(17, 34, 64, 0.8)',
    border: '1px solid rgba(100, 255, 218, 0.15)',
    borderRadius: '4px',
    padding: '14px 16px',
    color: 'var(--text-main)',
    fontSize: '0.9rem',
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const contact = data?.contact;

  const form = (
    <div className="grid-responsive" style={{ marginTop: '1rem' }}>
      {/* Left — info */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1rem' }}>
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {contact?.email && (
            <a href={`mailto:${contact.email}`} style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', color: 'var(--text-dim)', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>✉</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{contact.email}</span>
            </a>
          )}
          {contact?.phone && (
            <a href={`tel:${contact.phone}`} style={{ display: 'flex', gap: '1rem', alignItems: 'center', textDecoration: 'none', color: 'var(--text-dim)', transition: 'color 0.3s' }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--text-dim)'}
            >
              <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>📞</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{contact.phone}</span>
            </a>
          )}
          {contact?.location && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', color: 'var(--text-dim)' }}>
              <span style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>📍</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{contact.location}</span>
            </div>
          )}
        </div>
        {/* Social links */}
        <div style={{ display: 'flex', gap: '1.25rem', marginTop: '2.5rem' }}>
          {contact?.github && <a href={contact.github} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.78rem' }}>GitHub ↗</a>}
          {contact?.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.78rem' }}>LinkedIn ↗</a>}
        </div>
      </motion.div>

      {/* Right — form */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>
              Name
            </label>
            <input
              type="text" required style={inputStyle}
              value={formData.name}
              placeholder="Your name"
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'rgba(100, 255, 218, 0.15)'}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>
              Email
            </label>
            <input
              type="email" required style={inputStyle}
              value={formData.email}
              placeholder="your@email.com"
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'rgba(100, 255, 218, 0.15)'}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>
              Message
            </label>
            <textarea
              rows="5" required style={{ ...inputStyle, resize: 'vertical' }}
              value={formData.message}
              placeholder="Your message..."
              onFocus={e => e.target.style.borderColor = 'var(--primary)'}
              onBlur={e => e.target.style.borderColor = 'rgba(100, 255, 218, 0.15)'}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}>
            Send Message →
          </button>
          {status && (
            <p style={{
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              color: status.startsWith('✓') ? 'var(--primary)' : '#ff6b6b',
              marginTop: '0.25rem'
            }}>
              {status}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );

  if (!standalone) return form;

  return (
    <PageContainer>
      <PageHeader title="Get In Touch" subtitle="Feel free to reach out — I'm always open to new opportunities." />
      {form}
    </PageContainer>
  );
};

export default Contact;
