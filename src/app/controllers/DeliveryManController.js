import * as Yup from 'yup';
import DeliveryMan from '../models/DeliveryMan';
import MESSAGE from '../messages';
import File from '../models/File';

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

    const exist = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (exist) {
      return res.status(400).json(MESSAGE.ERROR.DUPLICITY.DELIVERYMAN);
    }

    const deliveryMan = await DeliveryMan.create(req.body);

    return res.json(deliveryMan);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const { email } = req.body;
    const deliveryMan = await DeliveryMan.findByPk(req.params.id);

    if (email && deliveryMan.email !== email) {
      const emailDuplicated = DeliveryMan.findOne({ where: { email } });

      if (emailDuplicated) {
        return res.status(400).json(MESSAGE.ERROR.DUPLICITY.DELIVERYMAN);
      }
    }

    const { id, name, avatar_id } = await deliveryMan.update(req.body);

    return res.json({ id, name, email, avatar_id });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveryMans = await DeliveryMan.findAll({
      where: { deleted: false },
      attributes: ['id', 'name', 'email', 'avatar_id', 'deleted'],
      include: [
        { model: File, as: 'avatar', attributes: ['name', 'path', 'url'] },
      ],
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(deliveryMans);
  }

  async delete(req, res) {
    const deliveryMan = await DeliveryMan.findOne({
      where: { id: req.params.id },
    });

    deliveryMan.deleted = true;
    await deliveryMan.save();

    return res.json(deliveryMan);
  }
}

export default new DeliveryManController();
