import { describe, test, vi, expect } from 'vitest';
import UserController from './UserController.js';
import InMemoryUserRepository from '../../repositories/InMemoryUserRepository.js';
describe('User controller', () => {
  test('Create a user successfully', async () => {
    const repository = new InMemoryUserRepository();
    const userController = new UserController(repository);
    const request = {
      body: {
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@mail.com',
        password: 'pass1234',
      },
    };

    const response = {
      status: vi.fn(() => response),
      json: vi.fn(),
    };

    await userController.create(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      id: expect.any(String),
      name: 'John',
    });
  });

  test('Cannot create a user with duplicate email', async () => {
    const repository = new InMemoryUserRepository();
    const userController = new UserController(repository);
    await repository.create({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@mail.com',
      password: 'pass1234',
    });
    const request = {
      body: {
        name: 'John',
        lastname: 'Doe',
        email: 'johndoe@mail.com',
        password: 'pass1234',
      },
    };

    const response = {
      status: vi.fn(() => response),
      json: vi.fn(),
    };

    await userController.create(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith({
      error: 'Email already exists',
    });
  });

  test('Login successfully', async () => {
    const repository = new InMemoryUserRepository();
    const userController = new UserController(repository);
    await repository.create({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@mail.com',
      password: 'pass1234',
    });

    const request = {
      body: {
        email: 'johndoe@mail.com',
        password: 'pass1234',
      },
    };

    const response = {
      status: vi.fn(() => response),
      json: vi.fn(),
    };

    await userController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
  });

  test('Login failure', async () => {
    const repository = new InMemoryUserRepository();
    const userController = new UserController(repository);
    await repository.create({
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe@mail.com',
      password: 'pass1234',
    });

    const request = {
      body: {
        email: 'johndoe@mail.com',
        password: 'pass123',
      },
    };

    const response = {
      status: vi.fn(() => response),
      json: vi.fn(),
    };

    await userController.login(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
  });
});
