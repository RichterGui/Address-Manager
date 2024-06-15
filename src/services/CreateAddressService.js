import '../types/types.js';

export default class CreateAddressService {
  constructor(repository) {
    this.addressRepository = repository;
  }

  /**
   *
   * @param {AddressType} address
   * @returns {Promise<{id: string, description: string, number: number, street: string, district: string, reference: string, zipcode: string, city: string, state: string, country: string}>}
   */
  async execute({
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
    const address = await this.addressRepository.create({
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

    return address;
  }
}
