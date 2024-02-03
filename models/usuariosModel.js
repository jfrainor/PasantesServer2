const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const usuario = sequelize.define(
    "usuarios",
    {
      iduser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre_user: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      apellido_user: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      correo_user: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      telefono_user: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      genero_user: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      contra_user: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return usuario;
};
