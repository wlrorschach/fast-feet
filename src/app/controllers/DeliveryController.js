import * as Yup from 'yup';

import MESSAGE from '../messages';

class Delivery {
  async store(req, res) {
    const schema = Yup.object({});
    res.json(MESSAGE.SUCCES.TEST);
  }
}

export default new Delivery();
