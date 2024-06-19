import CreateAddressService from '../../services/CreateAddressService.js';
import ListAddressService from '../../services/ListAddressService.js';
import UpdateAddressService from '../../services/UpdateAddressService.js';
import DeleteAddressService from '../../services/DeleteAddressService.js';
import FindAddressById from '../../services/FindAddressById.js';
import generateSharedToken from '../../helpers/generateSharedToken.js';

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
      return response.status(200).json({ ...address });
    } catch (error) {
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

  async findById(request, response) {
    try {
      const { addressid } = request.body;
      const findUnique = new FindAddressById(this.addressRepository);
      const address = await findUnique.execute(addressid);
      if (!address) {
        return response.status(404).json({ error: 'Not found' });
      }
      const newAddress = {
        description: address.description,
        number: address.number,
        street: address.street,
        district: address.district,
        reference: address.reference,
        zipcode: address.zipcode,
        city: address.ciry,
        state: address.state,
        country: address.country,
      };
      return response.status(200).json({ ...newAddress });
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
      const { userid } = request.headers;
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
        userid,
      });
      if (!updatedAddress) {
        return response.status(404).json({ error: 'Not found' });
      }
      return response.status(200).json({ ...updatedAddress });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const { userid } = request.headers;
      const addressDelete = new DeleteAddressService(this.addressRepository);
      const deletedAddress = await addressDelete.execute(id, userid);
      if (!deletedAddress) {
        return response.status(404).json({ error: 'Not found' });
      }
      return response.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async share(request, response) {
    try {
      const { id } = request.params;
      const token = await generateSharedToken(id);
      return response.status(201).json({ token });
    } catch (error) {
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}
