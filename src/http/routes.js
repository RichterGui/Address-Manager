import express from 'express';
import UserController from './controllers/UserController.js';
import PostgreUserRepository from '../repositories/PostgreUserRepository.js'


const userRepository = new PostgreUserRepository()
const router = express.Router();
const users = new UserController(userRepository)

router.post('/users', users.create.bind(users))
router.post('/users/login', users.login.bind(users))


export default router