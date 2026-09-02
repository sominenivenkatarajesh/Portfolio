import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import { defaultPortfolioData } from './data/portfolioData';
import './index.css';

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
    <Layout>
      <Home data={data} />
    </Layout>
  );
}

export default App;
