// models/ProductType.js
module.exports = (sequelize, DataTypes) => {
    let alias = 'ProductType';
    let cols = {
      IDType: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NameType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    };
  
    let config = {
      tableName: 'producttype',
      timestamps: false,
    };
  
    const ProductType = sequelize.define(alias, cols, config);
  
    return ProductType;
  };
  