const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {};
    Category.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Category',
        tableName: 'categories',
    });
    return Category;
};
