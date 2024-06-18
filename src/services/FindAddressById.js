export default class FindAddressById {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async execute(id) {
    const address = await this.addressRepository.findUnique(id);
    return address;
  }
}
