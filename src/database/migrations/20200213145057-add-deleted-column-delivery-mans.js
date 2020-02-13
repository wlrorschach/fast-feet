module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('delivery_mans', 'deleted', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('delivery_mans', 'email');
  },
};
