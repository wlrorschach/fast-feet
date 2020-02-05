import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

const models = [User];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connetction = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connetction));
  }
}

export default new Database();
