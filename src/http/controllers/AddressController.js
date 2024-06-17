import CreateAddressService from '../../services/CreateAddressService.js';
import ListAddressService from '../../services/ListAddressService.js';
import UpdateAddressService from '../../services/UpdateAddressService.js';
import DeleteAddressService from '../../services/DeleteAddressService.js';

export default class AddressController {
  constructor(repository) {
    this.addressRepository = repository;
  }

  async create(request, response) {
    try {
      const {
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

      const { userid } = request.headers;
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

  async list(request, response) {
    try {
      const { userid } = request.headers;
      const addressesList = new ListAddressService(this.addressRepository);
      const addresses = await addressesList.execute(userid);
      return response.status(200).json({ addresses });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(request, response) {
    try {
      const {
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

      const { id } = request.params;

      const addressUpdate = new UpdateAddressService(this.addressRepository);
      const updatedAddress = await addressUpdate.execute({
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
      });
      return response.status(200).json({ updatedAddress });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const addressDelete = new DeleteAddressService(this.addressRepository);
      const deletedAddress = await addressDelete.execute(id);
      return response
        .status(200)
        .json({ removed: deletedAddress, message: 'Deleted successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
