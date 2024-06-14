import { request, response } from 'express';
import CreateUserService from '../../services/CreateUserService.js'
import UserLoginService from '../../services/UserLoginService.js';
import validateUserParams from '../../helpers/validateUserParams.js';
import validateUserLoginParams from '../../helpers/validateUserLoginParams.js'



export default class UserController {

  constructor(repository) {
    this.userRepository = repository;
  }

  async create(request, response) {
    try {
      const {name, lastname, email, password} = request.body;
      await validateUserParams(name, lastname, email, password)
      const createUser = new CreateUserService(this.userRepository);
      const user = await createUser.execute({name, lastname, email, password})
      return response.status(200).json({id: user.id, name: user.name});
    } catch (error) {
      console.log(error)
      if(error.message == 'Email already exists') {
        return response.status(400).json({error: "Email already exists"})
      }
      if(error.message.includes('Request body does not meet endpoint expectations on the attribute')) {
       return response.status(400).json({error: error.message})
      }
      return response.status(500).json({error: "Internal server error"})
    }
  }

  async login(request, response) {
    try {
      const {email, password} = request.body
      await validateUserLoginParams(email, password)
      const userLogin = new UserLoginService(this.userRepository);
      const user = await userLogin.execute({email, password})
      return response.status(200).json({user});
    } catch (error) {
      console.log(error)
      return response.status(500).json({error: "Internal server error"})
    }
  }

}


