import express from 'express';
import PostgreUserRepository from '../repositories/PostgreUserRepository.js';
import PostgresAddressRepository from '../repositories/PostgreAddressRepository.js';
import UserController from './controllers/UserController.js';
import AddressController from './controllers/AddressController.js';
import verifyUser from './middlewares/verifyUser.js';

const userRepository = new PostgreUserRepository();
const addressRepository = new PostgresAddressRepository();
const router = express.Router();
const users = new UserController(userRepository);
const address = new AddressController(addressRepository);

router.post('/users', users.create.bind(users));
router.post('/users/login', users.login.bind(users));
router.post('/addresses', verifyUser, address.create.bind(address));
router.get('/addresses', verifyUser, address.list.bind(address));
router.put('/addresses/:id', verifyUser, address.update.bind(address));
router.delete('/addresses/:id', verifyUser, address.delete.bind(address));

export default router;
