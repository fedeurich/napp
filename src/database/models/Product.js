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

    
  };

  Product.findById = async function (productId) {
    return await Product.findByPk(productId);
  };
Product.deleteById = async function(productId) {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    await product.destroy();
    return true; // Indica que se eliminó exitosamente
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error; // Lanza el error para que sea manejado en otro lugar si es necesario
  }
};

  return Product;
};