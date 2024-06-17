import { randomUUID } from 'node:crypto';
import IAddressRepository from './IAddressRepository';

export default class InMemoryAddressRepository extends IAddressRepository {
  constructor() {
    super();
    this.addresses = [];
  }

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
    const address = this.addresses.push({
      id: randomUUID(),
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
    });

    return this.addresses[address - 1];
  }

  async listByUser(userid) {
    const userAddresses = this.addresses.filter((e) => e.userid === userid);
    if (!userAddresses) {
      return null;
    }
    return userAddresses;
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
  }) {
    const record = await this.addresses.find((e) => e.id === id);

    record.description = description;
    record.number = number;
    record.street = street;
    record.district = district;
    record.reference = reference;
    record.zipcode = zipcode;
    record.city = city;
    record.state = state;
    record.country = country;

    return record;
  }

  async delete(id) {
    const address = await this.addresses.find((e) => e.id === id);
    const index = this.addresses.indexOf(address);
    this.addresses.splice(index, 1);

    return 'removed';
  }
}
