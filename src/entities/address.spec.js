import { expect, test } from 'vitest';
import { randomUUID } from 'node:crypto';
import Address from './Address.js';

test('create an address', () => {
  const address = new Address({
    id: randomUUID(),
    description: 'company x address',
    number: 123,
    street: 'street x',
    district: 'district x',
    reference: 'next to y store',
    zipcode: '123123123',
    city: 'x',
    state: 'y',
    country: 'z',
  });

  expect(address).toBeInstanceOf(Address);
  expect(address.number).toEqual(123);
});
