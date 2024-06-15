export default class DeleteAddressService {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async execute(id) {
    const address = await this.addressRepository.delete(id);
    return address;
  }
}
