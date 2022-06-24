const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const models = {};
// get base file name which is index.js
const basename = path.basename(__filename);

// Create sequelize client for which is connected to DB
const sequelizeClient = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        // dialect for postgres 
        dialect: 'postgresql'
    }
);

// checking that db connected or not
sequelizeClient.authenticate()
.then(() => {
  console.log('DB connected!');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Importing all files for models which are available in current folder
fs.readdirSync(__dirname)
    .filter(file => {
        // include only js files excluding current file which is index.js
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        // Assigning models with sequelize client
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