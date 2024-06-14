import pg from 'pg';

const { Pool } = pg;

const db = new Pool({
  user: 'admin',
  database: 'addressmanagerdb',
  port: 5432,
  host: 'localhost',
  password: 'admin',
  ssl: false,
});

export default db;
