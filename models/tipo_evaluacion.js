const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const tipoEvaluacion = sequelize.define(
    "tipo_evaluacion",
    {
      idtipo_evaluacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return tipoEvaluacion;
};
