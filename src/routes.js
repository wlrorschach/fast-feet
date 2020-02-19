import { Router } from 'express';

import multer from 'multer';
import Auth from './app/middlewares/auth';

import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import SesssionController from './app/controllers/SesssionController';
import DeliveryManController from './app/controllers/DeliveryManController';
import AvatarFileContoller from './app/controllers/AvatarFileContoller';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanDeliveries from './app/controllers/DeliverymanDeliveries';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

/**
 * DELIVERY
 */
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', Auth, DeliveryController.store);
routes.put('/deliveries/:id', Auth, DeliveryController.update);
routes.delete('/deliveries/:id', Auth, DeliveryController.delete);

/**
 * DELIVERYMAN CRUD
 */
routes.post('/deliverymans', Auth, DeliveryManController.store);
routes.put('/deliverymans/:id', Auth, DeliveryManController.update);
routes.get('/deliverymans', Auth, DeliveryManController.index);
routes.delete('/deliverymans/:id', Auth, DeliveryManController.delete);

/**
 * DELIVERYMAN MANAGE DELIVERIES
 */
routes.get('/deliveryman/:id', DeliverymanDeliveries.index);
routes.put('/deliveryman/:id', DeliverymanDeliveries.update);

/**
 * FILE
 */
routes.post('/files', Auth, upload.single('file'), AvatarFileContoller.store);
// routes.post('/files', Auth, upload.any('file'), AssignatureFileContoller.store);

/**
 * RECIPIENTS
 */
routes.post('/recipients', Auth, RecipientController.store);
routes.get('/recipients/:name', RecipientController.show);
routes.put('/recipients', Auth, RecipientController.update);

/**
 * SESSION
 */
routes.post('/sessions', SesssionController.store);

/**
 * USER
 */
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', Auth, UserController.update);

export default routes;
