// models/Product.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
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
  },
  {
    tableName: 'product',
    timestamps: false,
  });

  // Agrega la asociación con el modelo Category
  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'IDCategory',
    });

    Product.belongsTo(models.ProductType, {  // Agrega esta línea
      as: 'productType',
      foreignKey: 'IDType',
    });
  };
  Product.findById = async function (productId) {
    return await Product.findByPk(productId);
  };
  return Product;
};
