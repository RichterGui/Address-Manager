export default class DeleteAddressService {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async execute(id, userid) {
    const address = await this.addressRepository.delete(id, userid);
    return address;
  }
}
