import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scene from './components/Scene';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Certifications from './pages/Certifications';
import Achievements from './pages/Achievements';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import './index.css';

const Loader = () => (
  <div style={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a192f'
  }}>
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 800,
      fontSize: '2rem',
      color: 'var(--primary)',
      letterSpacing: '-0.02em',
      marginBottom: '2rem'
    }}>
      SVRN.
    </div>
    <div style={{ width: '180px', height: '1px', background: 'rgba(100, 255, 218, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        background: 'var(--primary)',
        animation: 'loading 1.6s infinite ease-in-out'
      }} />
    </div>
    <style>{`
      @keyframes loading {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
    `}</style>
  </div>
);

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetch(`${apiUrl}/api/data`)
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(json => setData(json))
      .catch((e) => setError(e.message || "Unknown error"));
  }, [apiUrl]);

  if (error) return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a192f', color: '#64ffda', fontFamily: 'monospace', padding: '20px', textAlign: 'center' }}>
      <p>Backend not reachable.</p>
      <p style={{ color: '#ff6b6b', marginTop: '10px' }}>Error Details: {error}</p>
      <p style={{ color: '#8892b0', marginTop: '10px', fontSize: '0.85rem' }}>Attempted to fetch from: {apiUrl || '(Relative Path)'}/api/data</p>
    </div>
  );

  if (!data) return <Loader />;

  return (
    <Router>
      <Scene />
      <Layout>
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/about" element={<About data={data} />} />
          <Route path="/skills" element={<Skills data={data} />} />
          <Route path="/projects" element={<Projects data={data} />} />
          <Route path="/certifications" element={<Certifications data={data} />} />
          <Route path="/achievements" element={<Achievements data={data} />} />
          <Route path="/experience" element={<Experience data={data} />} />
          <Route path="/contact" element={<Contact data={data} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
