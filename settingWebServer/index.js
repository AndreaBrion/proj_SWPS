// index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurazione della connessione al db PostgreSQL
const pool = new Pool({
  user: 'postgres',         // nome utente del db
  host: 'localhost',
  database: 'Imdb',
  password: '',
  port: 5432,               // porta predefinita PostgreSQL
});

// Test di connessione al db
pool.connect()
  .then(() => console.log('Connesso al database PostgreSQL'))
  .catch(err => console.error('Errore di connessione:', err));

// Rotta base
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Ora del server PostgreSQL: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore nel recupero dei dati');
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
