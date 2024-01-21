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
