import { expect, test } from 'vitest';
import { randomUUID } from 'node:crypto';
import User from './User.js';

test('create an user', () => {
  const user = new User({
    id: randomUUID(),
    name: 'John',
    lastname: 'Doe',
    email: 'johndoe@mail.com',
    password: 'pass12345',
  });

  expect(user).toBeInstanceOf(User);
  expect(user.email).toEqual('johndoe@mail.com');
});

test('create an user with invalid email', () => {
  expect(() => {
    new User({
      id: randomUUID(),
      name: 'John',
      lastname: 'Doe',
      email: 'johndoe_mail.com',
      password: 'pass12345',
    });
  }).toThrow('Invalid email');
});
