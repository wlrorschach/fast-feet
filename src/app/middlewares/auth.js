import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import auth from '../../config/auth';
import MESSAGE from '../messages';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json(MESSAGE.ERROR.TOLKEN);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json(MESSAGE.ERROR.TOLKEN);
  }
};
