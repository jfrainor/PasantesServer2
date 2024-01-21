const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const contenido = sequelize.define(
    "contenidos",
    {
      idcontenidos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return contenido;
};
