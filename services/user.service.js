const { User } = require('../models/user');

/**
 *
 * @class UserService
 */
class UserService {

  /**
   * creates a new user 
   *
   * @param {*} newUser: User object
   * @returns Promise<User>
   * @memberof UserService
   */
  registerNewUser(newUser) {
    let user = new User({ ...newUser });
    return user.save();
  }

}

module.exports = new UserService();