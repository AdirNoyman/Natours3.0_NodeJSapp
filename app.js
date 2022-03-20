'use strict';

const express = require('express');
const app = express();

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Adiros 🤓', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.status(201).send('Document created! 🤓');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT} 😎🤟`);
});
