import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    return res.json({ message: 'ok' });
  }
}

export default new SessionController();
