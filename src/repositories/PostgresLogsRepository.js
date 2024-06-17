import db from '../database/db.js';

export default class PostgresLogsRepository {
  async create({ userid, old, modified, operation }) {
    try {
      const query = `INSERT INTO logs (userid, old, modified, operation) VALUES($1, $2, $3, $4)`;
      const values = [userid, old, modified, operation];
      await db.query(query, values);
      return;
    } catch (error) {
      throw error;
    }
  }

  async list() {
    const logs = await db.query(`SELECT * FROM logs`);
    return logs.rows;
  }
}
