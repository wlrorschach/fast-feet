import User from '../models/User';

class UserController {
  async store(req, res) {
    return res.json(
      await User.create({
        name: 'Wiliam A',
        email: 'wlrorschach@gmail.com',
        password_hash: '32132131',
      })
    );
  }
}

export default new UserController();
