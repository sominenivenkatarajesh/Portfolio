const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataHandler = require('./data');
const contactHandler = require('./contact');

app.get('/api/data', dataHandler);
app.post('/api/contact', contactHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Portfolio Engine engaged on port ${PORT}`));
}

module.exports = app;
