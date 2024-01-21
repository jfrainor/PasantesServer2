const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const carrera = sequelize.define(
    "carrera",
    {
      idcarrera: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(45),
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
  return carrera;
};
