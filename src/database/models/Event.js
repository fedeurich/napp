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
      IDProduct: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      IDEmployee: {
        type: DataTypes.INTEGER,
        allowNull: false
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
    Event.belongsTo(models.Product, {
      as: "Product",
      foreignKey: "IDProduct",
    });
    Event.belongsTo(models.Employee, {
      as: "Employee",
      foreignKey: "IDEmployee",
    });
  

  };

  return Event;
};
