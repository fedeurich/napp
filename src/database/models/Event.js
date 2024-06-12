const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Event = sequelize.define(
    "Event",
    {
      IDEvent: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      AddressEvent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      DateEvent: {
        type: DataTypes.DATE,
        allowNull: false
      },
      IDClient: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      ProductsArray: {
        type: DataTypes.JSON, // Cambia a JSON
        allowNull: false
      },
      IDEmployee: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      IDCateringType: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: "Event",
      timestamps: false,
    }
  );

  Event.associate = function (models) {
    Event.belongsTo(models.CateringType, {
      as: "CateringType",
      foreignKey: "IDCateringType",
    });
    Event.belongsTo(models.Client, {
      as: "Client",
      foreignKey: "IDClient",
    });
    Event.belongsToMany(models.Product, {
      through: "EventProduct",
      as: "Product"
    });
    Event.belongsTo(models.Employee, {
      as: "Employee",
      foreignKey: "IDEmployee",
    });
  };

  
  return Event;
};