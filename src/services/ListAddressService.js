export default class ListAddressService {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async execute(userid) {
    const addresses = await this.addressRepository.listByUser(userid);
    return addresses;
  }
}
