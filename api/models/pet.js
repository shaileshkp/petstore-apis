const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Pet extends Model {}
    Pet.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photoUrls: {
            type: DataTypes.ARRAY(DataTypes.INTEGER)
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'Pet',
        tableName: 'pets',
    });
    return Pet;
};
