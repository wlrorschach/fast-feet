import { Router } from 'express';
import SesssionController from '../app/controllers/SesssionController';
import UserController from '../app/controllers/UserController';
import Auth from '../app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.post('/sessions', SesssionController.store);

routes.put('/users', Auth, UserController.update);

export default routes;
