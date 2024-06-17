export default class UpdateAddressService {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async execute({
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
    userid,
  }) {
    const address = await this.addressRepository.updateById({
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
      userid,
    });

    return address;
  }
}
