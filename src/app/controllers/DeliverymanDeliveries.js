import * as Yup from 'yup';
import {
  setHours,
  setMinutes,
  setSeconds,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import MESSAGE from '../messages';

class DeliverymanDeliveries {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.id,
        cancealed_at: null,
      },
    });

    if (!deliveries) {
      return res.status(400).json(MESSAGE.WARNING.LIST_EMPTY);
    }

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object({
      start_at: Yup.date(),
      end_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }
    const { id, start_at, end_at } = req.body;
    const deliveryman_id = req.params.id;
    const date = Number(new Date());

    // const hourInit = setSeconds(setMinutes(setHours(date, '08'), '00'), '00');

    /**
     * Verificando se o numero maximo de retiradas diarias foi atingido(5)
     */
    const now = new Date();
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id,
        cancealed_at: null,
        end_at: null,
        start_at: { [Op.between]: [startOfDay(now), endOfDay(now)] },
      },
    });

    const numberOfDeliveries = deliveries.length;

    if (numberOfDeliveries > 4) {
      return res.status(400).json(MESSAGE.WARNING.MAX_DELIVERIES);
    }

    const delivery = await Delivery.findOne({
      where: { deliveryman_id, id, cancealed_at: null, end_at: null },
    });

    /**
     * Verificando se o id informado corresponde a uma entrega a ser retirada
     */
    if (!delivery) {
      return res.status(400).json(MESSAGE.WARNING.LIST_EMPTY);
    }

    /**
     * Verificando se esta sendo informada uma retirada ou uma entrega
     */
    if (delivery.start_at && end_at) {
      if (end_at > new Date() || end_at < delivery.start_at) {
        return res.status(400).json(MESSAGE.ERROR.INVALID_DATE);
      }

      delivery.update({ end_at });
    } else if (start_at && !delivery.start_at) {
      if (start_at > new Date()) {
        return res.status(400).json(MESSAGE.ERROR.INVALID_DATE);
      }

      delivery.update({ start_at });
    }
    return res.json({ delivery, numberOfDeliveries });
  }
}

export default new DeliverymanDeliveries();
