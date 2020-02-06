import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import auth from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not authorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
