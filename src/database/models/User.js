module.exports = (sequelize, DataTypes) => {
  let alias = "User"; // en singular
  let cols = {
    IDUser: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    },
    Image: {
      type: DataTypes.STRING,
    },
    PasswordUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "user",
    timestamps: false, // Sin marcas de tiempo
    // createdAt: false,  // Puedes comentar o eliminar estas líneas
    // updatedAt: false,  // Si no necesitas las marcas de tiempo
    // deletedAt: false,  // Si no necesitas soft deletes
  };

  const User = sequelize.define(alias, cols, config);

  return User;
};
