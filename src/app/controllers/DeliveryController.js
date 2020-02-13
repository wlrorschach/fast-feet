import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import MESSAGE from '../messages';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object({
      product_name: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const delivery = await Delivery.create(req.body);

    return res.json(delivery);
  }

  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: req.params.id },
    });

    if (!!deliveries.length === 0) {
      return res.status(400).json(MESSAGE.WARNING.LIST_EMPTY);
    }
    return res.json(deliveries);
  }
}

export default new DeliveryController();
