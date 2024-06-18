import IAddressRepository from './IAddressRepository.js';
import '../types/types.js';
import { randomUUID } from 'node:crypto';
import db from '../database/db.js';
import Address from '../entities/Address.js';
import PostgresLogsRepository from './PostgresLogsRepository.js';

export default class PostgresAddressRepository extends IAddressRepository {
  constructor() {
    super();
    this.logs = new PostgresLogsRepository();
  }
  /**
   * @param {AddressType} address
   * @return {Promise <{AddressType}>}
   */
  async create({
    userid,
    description,
    number,
    street,
    district,
    reference,
    zipcode,
    city,
    state,
    country,
  }) {
    try {
      const query = `INSERT INTO addresses (id, userid, description, number, street, district, reference, zipcode, city, state, country) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`;
      const values = [
        randomUUID(),
        userid,
        description,
        number,
        street,
        district,
        reference,
        zipcode,
        city,
        state,
        country,
      ];

      const res = await db.query(query, values);
      return new Address(res.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  async listByUser(userid) {
    const query = 'SELECT * FROM addresses WHERE userid = $1';
    const res = await db.query(query, [userid]);
    return res.rows.length ? res.rows : null;
  }

  async findUnique(id) {
    const query = 'SELECT * FROM addresses where id = $1';
    const res = await db.query(query, [id]);
    return res.rows.length ? res.rows[0] : null;
  }

  async updateById({
    id,
    description,
    number,
    street,
    district,
    reference,
    zipcode,
    city,
    state,
    country,
    userid,
  }) {
    try {
      const actual = await db.query(`SELECT * FROM addresses WHERE id = $1`, [
        id,
      ]);

      const query =
        'UPDATE addresses SET description = $1, number = $2, street = $3, district = $4, reference = $5, zipcode = $6, city = $7, state = $8, country = $9, dt_update = CURRENT_TIMESTAMP WHERE id = $10 RETURNING *';
      const values = [
        description,
        number,
        street,
        district,
        reference,
        zipcode,
        city,
        state,
        country,
        id,
      ];
      const res = await db.query(query, values);
      const item = res.rows.length ? res.rows[0] : null;
      await this.logs.create({
        userid: userid,
        old: actual.rows[0],
        modified: item,
        operation: 'PUT',
      });
      return item;
    } catch (error) {
      throw error;
    }
  }

  async delete(id, userid) {
    try {
      const actual = await db.query(`SELECT * FROM addresses WHERE id = $1`, [
        id,
      ]);
      const query = 'DELETE FROM addresses WHERE id = $1';
      const res = await db.query(query, [id]);
      await this.logs.create({
        userid: userid,
        old: actual.rows[0],
        modified: { data: 'deleted' },
        operation: 'DELETE',
      });
      return res.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
