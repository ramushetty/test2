const { Pool } = require('pg');

const pool = new Pool({
  user: 'test',
  host: 'localhost',
  database: 'test',
  password: 'test123',
  port: 5432, // default PostgreSQL port
});

module.exports = { pool };