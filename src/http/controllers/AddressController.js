import CreateAddressService from '../../services/CreateAddressService';

export default class AddressController {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async create(request, response) {
    try {
      const {
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
      } = request.body;
      const addressCreate = new CreateAddressService(this.addressRepository);
      const address = await addressCreate.execute({
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
      return response.status(200).json({ address });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async list(request, response) {}
  async update(request, response) {}
  async delete(request, response) {}
}
