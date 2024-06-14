import '../types/types.js';

export default class User {
  /**
   *@param {UserType} User
   */
  constructor({
    id, name, lastname, email, password,
  }) {
    this.id = id
    this.setName(name);
    this.setLastname(lastname);
    this.setEmail(email)
    this.setPassword(password)
  }


  setName(name){
    if(!name) {
      throw new Error('Name not informed')
    }
    this.name = name;
  }
  setLastname(lastname){
    if(!lastname) {
      throw new Error('Lastname not informed')
    }
    this.lastname = lastname;
  }

  setEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){
      throw new Error('Invalid email.')
    }
    this.email = email
  }

  setPassword(password) {
    if(!password) {
      throw new Error('Password not informed.')
    }

    this.password = password
  }

}
