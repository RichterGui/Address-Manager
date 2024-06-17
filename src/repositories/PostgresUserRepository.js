import { randomUUID } from 'node:crypto';
import IUserRepository from './IUserRepository.js';
import User from '../entities/User.js';
import db from '../database/db.js';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
const { sign } = jwt;
config();

export default class PostgresUserRepository extends IUserRepository {
  /**
   * @param {UserType} user
   * @returns {Promise <{id: string, name: string, lastname: string, email: string, password: string}>}
   */
  async create({ name, lastname, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query =
        'INSERT INTO users (id, name, lastname, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *';
      const values = [randomUUID(), name, lastname, email, hashedPassword];
      const res = await db.query(query, values);
      return new User(res.rows[0]);
    } catch (error) {
      if (error.code == '23505') {
        throw Error('Email already exists');
      }
      throw error;
    }
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const res = await db.query(query, [email]);
    return res.rows.length ? new User(res.rows[0]) : null;
  }

  async login({ email, password }) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        throw Error('User not found');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw Error('Invalid password');
      }
      const token = sign({ hash: user.id }, process.env.SECRET_KEY);
      return {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        token: token,
      };
    } catch (error) {
      throw error;
    }
  }
}
