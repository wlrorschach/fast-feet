import { Router } from 'express';

import multer from 'multer';
import Auth from './app/middlewares/auth';

import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import SesssionController from './app/controllers/SesssionController';
import DeliveryManController from './app/controllers/DeliveryManController';
import AvatarFileContoller from './app/controllers/AvatarFileContoller';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

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
 * DELIVERY MANS
 */
routes.post('/delivery-mans', Auth, DeliveryManController.store);
routes.put('/delivery-mans', Auth, DeliveryManController.update);

/**
 * FILE
 */
routes.post('/files', Auth, upload.any('file'), AvatarFileContoller.store);
// routes.post('/files', Auth, upload.any('file'), AssignatureFileContoller.store);

export default routes;
