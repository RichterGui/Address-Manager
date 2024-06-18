import express from 'express';
import PostgreUserRepository from '../repositories/PostgresUserRepository.js';
import PostgresAddressRepository from '../repositories/PostgresAddressRepository.js';
import UserController from './controllers/UserController.js';
import AddressController from './controllers/AddressController.js';
import PostgresLogsRepository from '../repositories/PostgresLogsRepository.js';
import LogsController from './controllers/LogsController.js';
import verifyUser from './middlewares/verifyUser.js';
import verifyJwtValidity from './middlewares/verifyJwtValidity.js';

const userRepository = new PostgreUserRepository();
const addressRepository = new PostgresAddressRepository();
const logsRepository = new PostgresLogsRepository();
const router = express.Router();
const users = new UserController(userRepository);
const address = new AddressController(addressRepository);
const logs = new LogsController(logsRepository);

router.post('/users', users.create.bind(users));
router.post('/users/login', users.login.bind(users));
router.post('/addresses', verifyUser, address.create.bind(address));
router.get('/addresses', verifyUser, address.list.bind(address));
router.put('/addresses/:id', verifyUser, address.update.bind(address));
router.delete('/addresses/:id', verifyUser, address.delete.bind(address));
router.post('/address/:id/share', verifyUser, address.share.bind(address));
router.get('/logs', logs.list.bind(logs));
router.get('/shared/:token', verifyJwtValidity, address.findById.bind(address));

export default router;
