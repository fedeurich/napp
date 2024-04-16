const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      IDRole: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NameRole: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      tableName: "Role",
      timestamps: false,
    }
  );

  Role.associate = function (models) {
    Role.hasMany(models.Employee, {
      as: "employees",
      foreignKey: "IDRole",
    });
  };

  return Role;
};
