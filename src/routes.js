import { Router } from 'express';
import Auth from './app/middlewares/auth';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import SesssionController from './app/controllers/SesssionController';
import DeliveryManController from './app/controllers/DeliveryManController';

const routes = new Router();

/**
 * USER
 */
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', Auth, UserController.update);

/**
 * SESSION
 */
routes.post('/sessions', SesssionController.store);

/**
 * RECIPIENTS
 */
routes.post('/recipients', Auth, RecipientController.store);
routes.get('/recipients/:name', RecipientController.show);
routes.put('/recipients', Auth, RecipientController.update);

/**
 * COURIERS
 */
routes.post('/couriers', Auth, DeliveryManController.store);

export default routes;
