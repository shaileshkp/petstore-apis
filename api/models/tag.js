const { DATE, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tag extends Model {};
    Tag.init({
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
        modelName: 'Tag',
        tableName: 'tags',
    });
    
    return Tag;
};
