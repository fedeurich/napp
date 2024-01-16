// models/Product.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Product', {
    IDProduct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IDCategory: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IDType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NameProduct: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    DescriptionProduct: {
      type: DataTypes.TEXT,
    },
  });
};
