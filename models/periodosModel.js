const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const periodo = sequelize.define(
    "periodos",
    {
      idperiodo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      fechainicio: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
      },
      fechafin: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
      },
      estatus: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return periodo;
};
