const dns = require('dns');

dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const conectarDB = require('./config/db');

require('dotenv').config();

const app = express();

conectarDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API La Vie En Rose funcionando',
  });
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
