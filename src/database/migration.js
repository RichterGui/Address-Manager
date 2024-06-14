import db from './db.js';

async function migration() {
  await db.query(`CREATE TABLE users (
    id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dt_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
}

migration();
