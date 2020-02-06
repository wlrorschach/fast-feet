import * as Yup from 'yup';
import User from '../models/User';
import MESSAGE from '../messages';

class UserController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json(MESSAGE.ERROR.DUPLICITY.USER);
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string(),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const { email, password, oldPassword } = req.body;

    const user = await User.findOne({ where: { id: req.userId } });

    if (email && user.email !== email) {
      const userExists = User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ error: MESSAGE.ERROR.DUPLICITY.USER });
      }
    }

    if (password && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: MESSAGE.ERROR.PASSWORD });
    }

    const { id, name } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async index(req, res) {
    const users = await User.findAll();

    const usersToShow = [];

    users.forEach(it => {
      const { id, name, email } = it;
      usersToShow.push({ id, name, email });
    });

    res.json(usersToShow);
  }
}

export default new UserController();
