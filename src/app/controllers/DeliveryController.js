import * as Yup from 'yup';
import MESSAGE from '../messages';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import Mail from '../../lib/Mail';
import DeliveryMan from '../models/DeliveryMan';
import DeliveyMail from '../jobs/DeliveyMail';
import CancellationMail from '../jobs/CancellationMail';

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

    const { product_name, recipient_id, deliveryman_id } = req.body;

    const recipient = await Recipient.findByPk(recipient_id);
    const deliveryMan = await DeliveryMan.findByPk(deliveryman_id);

    delivery.deliveryMan = deliveryMan;
    delivery.recipient = recipient;
    delivery.product_name = product_name;

    DeliveyMail.handle(delivery);

    return res.json(delivery);
  }

  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: req.params.deliverymanId, canceale_at: null },
    });

    if (!!deliveries.length === 0) {
      return res.status(400).json(MESSAGE.WARNING.LIST_EMPTY);
    }
    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object({
      deliveryman_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }
    const { deliveryman_id: deliveryMan } = req.body;

    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['email', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['street', 'number', 'city', 'state', 'complement'],
        },
      ],
    });

    if (delivery.deliveryman_id !== deliveryMan) {
      CancellationMail.handle(delivery);
      await delivery.update({ deliveryman_id: deliveryMan });
      DeliveyMail.handle(delivery);
    }

    return res.json(delivery);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);

    delivery.update({ canceale_at: new Date() });
    return res.json();
  }
}

export default new DeliveryController();
