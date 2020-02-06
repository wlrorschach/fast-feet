import { Router } from 'express';
import RecipientController from '../app/controllers/RecipientController';
import Auth from '../app/middlewares/auth';

const routes = new Router();

routes.post('/recipients', Auth, RecipientController.store);
routes.get('/recipients/:name', RecipientController.show);
routes.put('/recipients', Auth, RecipientController.update);

export default routes;
