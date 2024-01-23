// models/Category.js
module.exports = (sequelize, DataTypes) => {
    let alias = 'Category';
    let cols = {
      IDCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NameCategory: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
  
    let config = {
      tableName: 'category',
      timestamps: false,
    };
  
    const Category = sequelize.define(alias, cols, config);
    Category.associate = function (models) {
      Category.hasMany(models.Product, {
        as: 'products',
        foreignKey: 'IDCategory',
      });
    };
    return Category;
  };
  