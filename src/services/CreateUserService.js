import User from '../entities/User.js';
import '../types/types.js';

export default class CreateUserService {
  constructor(repository) {
    this.userRepository = repository
  }

  /**
   * @param {UserType} user
   * @returns {Promise<{id: string, name: string, lastname: string, email: string, password: string}>}
  */
  async execute({
    name, lastname, email, password,
  }) {
    const user = await this.userRepository.create({
      name, lastname, email, password,
    });

    return new User(user);
  }
}
