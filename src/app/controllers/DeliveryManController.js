import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import User from '../models/User';
import MESSAGE from '../messages';

class DeliveryManController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const admin = await User.findByPk(req.userId);

    if (!admin) {
      return res.status(401).json(MESSAGE.ERROR.UNAUTORIZED);
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {
    return res.json(MESSAGE.SUCCES.TEST);
  }
}

export default new DeliveryManController();
