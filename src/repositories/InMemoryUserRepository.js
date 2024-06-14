import IUserRepository from './IUserRepository.js';
import '../types/types.js';
import {randomUUID} from 'node:crypto'

export default class InMemoryUserRepository extends IUserRepository {
  constructor() {
    super();
    this.users = [];
  }

  /**
   * @param {UserType} user
   * @returns {Promise <{id: string, name: string, lastname: string, email: string, password: string}>}
   */
  async create({
     name, lastname, email, password,
  }) {
    let userExists = await this.findByEmail(email)
    if(userExists) {
      throw new Error("Email already exists")
    }
    const user = this.users.push({
      id:randomUUID(), name, lastname, email, password,
    });
    return this.users[user - 1];
  }

  async findByEmail(email) {
    const user = this.users.find((e) => e.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

}
