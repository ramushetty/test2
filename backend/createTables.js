const { Client } = require('pg');


const client = new Client({
  user: 'test',
  host: 'localhost',
  database: 'test',
  password: 'test123',
  port: 5432, // default PostgreSQL port
});

const tableQueries = [
  `
  CREATE TABLE IF NOT EXISTS users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP  NOT NULL,
    e_rupee DECIMAL(10, 2) DEFAULT 0.00 NOT NULL,
    role_id INT, 
    FOREIGN KEY (role_id) REFERENCES roles(id)
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS roles(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT NOT NULL
  )
  `,
  // Add more table creation queries here
  // Example:
  // `
  // CREATE TABLE IF NOT EXISTS products (
  //   product_id SERIAL PRIMARY KEY,
  //   name VARCHAR(100),
  //   price DECIMAL(10, 2),
  //   description TEXT
  // );
  // `
];
async function createTables() {
  await client.connect();

  try {
    for (const query of tableQueries) {
      await client.query(query);
    }
    console.log('Tables created or already exist');
  } catch (err) {
    console.error('Error creating tables', err);
  }

  await client.end();
}

module.exports = { createTables };
