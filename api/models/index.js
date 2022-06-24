const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const models = {};
const basename = path.basename(__filename);

const sequelizeClient = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgresql'
    }
);

sequelizeClient.authenticate()
.then(() => {
  console.log('DB connected!');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelizeClient, Sequelize.DataTypes);
        models[model.name] = model;
    });

Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelizeClient;
models.Sequelize = Sequelize;

module.exports = models;