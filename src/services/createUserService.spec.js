import { describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';
import CreateUserService from './CreateUserService.js';
import InMemoryUserRepository from '../repositories/InMemoryUserRepository.js';
import User from '../entities/User.js';

describe('Create user', () => {
  const repository = new InMemoryUserRepository();
  const createUser = new CreateUserService(repository);

  it('should be able to create an user', () => {
    const userCreated = createUser.execute({
      id: randomUUID(),
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@mail.com',
      password: '12341234',
    });

    expect(userCreated).resolves.toBeInstanceOf(User);
  });

  it('should not be able to create an user with missing fields', () => {
    const userCreated = createUser.execute({
      id: randomUUID(),
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@mail.com',
    });

    expect(userCreated).rejects.Throw(Error);
  });
});
