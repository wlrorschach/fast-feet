import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import recipientsRoutes from './routes/recipient.routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use([userRoutes, recipientsRoutes]);
  }
}

export default new App().server;
