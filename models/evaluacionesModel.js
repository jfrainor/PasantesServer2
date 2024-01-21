const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const evaluacion = sequelize.define(
    "evaluaciones",
    {
      idevaluaciones: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Nombre: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.DATEONLY(),
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATE(),
        allowNull: false,
      },
      comentario: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return evaluacion;
};
