module.exports = {
  up: queryInterface => {
    return queryInterface.addConstraint('delivery_mans', ['email'], {
      type: 'unique',
      name: 'unique_email_constraint',
    });
  },

  down: queryInterface => {
    return queryInterface.removeConstraint('delivery_mans', ['email']);
  },
};
