import Sequelize from 'sequelize';

// Setup Sequelize
const sequelize = new Sequelize('addressbook', 'postgres', 'postgres', {
  dialect: 'postgres',
  operatorsAliases: Sequelize.Op,
  define: {
    underscored: true,
  },
});

// Import Models
const models = {
  User: sequelize.import('./user'),
  Contact: sequelize.import('./contact'),
};

// Loop Through Models and set up Associations
Object.keys(models).forEach(modelName => {
  // Set up Associations for Model if it has Associate method
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
