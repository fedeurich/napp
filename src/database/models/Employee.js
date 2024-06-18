const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Employee = sequelize.define(
    "Employee",
    {
      IDEmployee: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      IDRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      Image: {
        type: DataTypes.STRING,
      },
      PaidLeave: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "Employee",
      timestamps: false,
      indexes: [{ unique: false, fields: ["IDRole"] }],
    }
  );

  Employee.associate = function (models) {
    Employee.belongsTo(models.Role, {
      as: "Role",
      foreignKey: "IDRole",
    });
    Employee.belongsToMany(models.Event, { through: "EventEmployee", as: "Event" });


  };

  Employee.findById = async function (employeeId) {
    return await Employee.findByPk(employeeId);
  };

  return Employee;
};
