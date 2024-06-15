import db from './db.js';

async function migration() {
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(128) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    dt_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dt_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

  await db.query(`CREATE TABLE IF NOT EXISTS addresses (
      id VARCHAR(128) PRIMARY KEY,
      userid VARCHAR(128),
      description VARCHAR(255),
      housenumber INTEGER NOT NULL,
      street VARCHAR(100) NOT NULL,
      district VARCHAR(50) NOT NULL,
      reference VARCHAR(255),
      zipcode VARCHAR(50) NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(50) NOT NULL,
      country VARCHAR(50) NOT NULL,
      dt_create TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      dt_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userid) REFERENCES users(id)
      )`);
}

migration();
