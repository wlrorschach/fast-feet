import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import DeliveryMan from '../app/models/DeliveryMan';
import File from '../app/models/File';

const models = [User, Recipient, File, DeliveryMan];
class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connetction = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connetction))
      .map(
        model => model.associate && model.associate(this.connetction.models)
      );
  }
}

export default new Database();
