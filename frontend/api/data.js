import { portfolioData, parseDate } from './portfolioData.js';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  const sortedData = JSON.parse(JSON.stringify(portfolioData));
  
  if (sortedData.certifications) {
    sortedData.certifications.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }
  if (sortedData.experience) {
    sortedData.experience.sort((a, b) => parseDate(b.period) - parseDate(a.period));
  }
  if (sortedData.achievements) {
    sortedData.achievements.sort((a, b) => parseDate(b.year) - parseDate(a.year));
  }
  if (sortedData.projects) {
    sortedData.projects.sort((a, b) => parseDate(b.date) - parseDate(a.date));
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(sortedData));
}
