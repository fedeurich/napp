const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      IDProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IDCategory: {
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
      Stock: {
        type: DataTypes.INTEGER,
      },
      Image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Product",
      timestamps: false,
      indexes: [{ unique: false, fields: ["IDCategory"] }],
    }
  );

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      as: "Category",
      foreignKey: "IDCategory",
    });
    Product.hasMany(models.Event, {
      as: "Event",
      foreignKey: 'IDProduct',
    });
  };

    
  

  Product.findById = async function (productId) {
    return await Product.findByPk(productId);
  };


  return Product;
};