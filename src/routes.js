import { Router } from 'express';

const routes = new Router();

routes.get('/teste', (req, res) => res.json({ nome: 'Wiliam' }));

export default routes;
