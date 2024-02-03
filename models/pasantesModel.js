const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const pasante = sequelize.define(
    "pasantes",
    {
      idpasante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pasante_cedula: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      experiencia_acad: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      estatus: {
        type: DataTypes.TINYINT(),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return pasante;
};
