import * as Yup from 'yup';
import Recipient from '../models/Recipient';
import MESSAGE from '../messages';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const recipientExists = await Recipient.findOne({
      where: { email: req.body.email },
    });

    if (recipientExists) {
      return res.status(400).json(MESSAGE.ERROR.DUPLICITY.RECIPIENT);
    }

    const recipientSaved = await Recipient.create(req.body);

    return res.json(recipientSaved);
  }

  async show(req, res) {
    const { name } = req.params;

    const recipient = await Recipient.findOne({ where: { name } });

    const returnEntity = recipient || MESSAGE.ERROR.NO_RESULT;

    return res.json(returnEntity);
  }

  async update(req, res) {
    const schema = Yup.object({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json(MESSAGE.ERROR.VALIDATION);
    }

    const { email } = req.body;

    const rec = await Recipient.findByPk(req.userId);

    if (email && rec.email !== email) {
      const recExists = await Recipient.findOne({
        where: { email },
      });
      if (recExists) {
        return res.status(400).json(MESSAGE.ERROR.DUPLICITY.RECIPIENT);
      }
    }

    const recSaved = await rec.update(req.body);

    return res.json(recSaved);
  }
}

export default new RecipientController();
