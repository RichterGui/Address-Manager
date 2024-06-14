import '../types/types.js';

export default class UserLoginService {
  constructor(repository) {
    this.userRepository = repository
  }

  /**
   * @param {UserType} user
   * @returns {Promise<{id: string, name: string, lastname: string,token:string}>}
  */
  async execute({
     email, password,
  }) {
    const user = await this.userRepository.login({
      email, password
      });

    return user;
  }
}
