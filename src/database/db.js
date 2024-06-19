import pg from 'pg';
import { config } from 'dotenv';
config();

const { Pool } = pg;

const db = new Pool({
  user: 'admin',
  database: 'addressmanagerdb',
  port: 5432,
  host: process.env.HOST,
  password: 'admin',
  ssl: false,
});

export default db;
