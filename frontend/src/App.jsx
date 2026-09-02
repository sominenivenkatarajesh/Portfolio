import React, { useState, useEffect, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import { defaultPortfolioData } from './data/portfolioData';
import './index.css';

// Lazy load Three.js 3D scene to prevent blocking first paint
const Scene = lazy(() => import('./components/Scene'));

function App() {
  const [data, setData] = useState(defaultPortfolioData);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || '';
    fetch(`${apiUrl}/api/data`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json && json.skills && json.projects) {
          setData(json);
        }
      })
      .catch(() => {
        // Fallback gracefully to defaultPortfolioData
      });
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Layout>
        <Home data={data} />
      </Layout>
    </div>
  );
}

export default App;
