// models/ShoppingCart.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ShoppingCart = sequelize.define(
    "ShoppingCart",
    {
      IDCart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IDUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      IDProduct: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UnitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      CartStatus: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      // Otras opciones del modelo
      tableName: "ShoppingCart", // Puedes especificar el nombre de la tabla si es diferente al nombre del modelo en plural
      timestamps: false, // Si no tienes campos createdAt y updatedAt en tu tabla
    }
  );

  // Agregar asociaciones con otros modelos si es necesario
  ShoppingCart.belongsTo(sequelize.models.User, {
    foreignKey: "IDUser",
    as: "user",
  });

  ShoppingCart.belongsTo(sequelize.models.Product, {
    foreignKey: "IDProduct",
    as: "product",
  });

  return ShoppingCart;
};
