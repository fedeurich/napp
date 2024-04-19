const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CateringType = sequelize.define(
    "CateringType",
    {
      IDCateringType: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NameCateringType: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      EmployeesRequired:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProductsRequired:{
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      tableName: "CateringType",
      timestamps: false,
    }
  );
  CateringType.associate = function (models) {
    CateringType.hasMany(models.Event, {
      foreignKey: 'IDCateringType'
    });
  };


  return CateringType;
};
