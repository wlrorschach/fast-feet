module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'recipients',
          key: 'id',
        },
        allowNull: false,
        onUpDate: 'CASCADE ALL',
      },
      deliveryman_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'delivery_mans',
          key: 'id',
        },
        allowNull: false,
        onUpDate: 'CASCADE ALL',
      },
      signature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
        },
        allowNull: true,
        onUpDate: 'CASCADE ALL',
        onDelete: 'SET NULL',
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceale_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliveries');
  },
};
