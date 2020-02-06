import { Router } from 'express';
import SesssionController from './app/controllers/SesssionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/users', SesssionController.store);

routes.post('/users', UserController.update);

export default routes;
