// index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurazione della connessione al db PostgreSQL
const pool = new Pool({
  user: 'postgres',                                         // nome utente del db
  host: 'localhost',
  database: 'Imdb',
  password: '123123',
  port: 5432,                                               // porta predefinita PostgreSQL
});

// Test di connessione al db
pool.connect()
  .then(() => console.log('Connesso al database PostgreSQL'))
  .catch(err => console.error('Errore di connessione:', err));

/*
Rotta base: ossia dove si visualizza il risultato della query

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Ora del server PostgreSQL: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore nel recupero dei dati');
  }

});
*/

//Query d'esempio per ottenere i dati da "titleAkas"
// app.get('/akas', async (req, res) => {                 //Qui da prompt dovevo inserire il nome akas: http://localhost:3000/akas
app.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT *
      FROM "titleAkas"
      LIMIT 10;
    `);
    res.json(result.rows);                                 // invia i dati come JSON al browser
  } catch (err) {
    console.error('Errore nella query SQL:', err);
    res.status(500).send('Errore nel server o nel database');
  }
});

// Avvio del server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
