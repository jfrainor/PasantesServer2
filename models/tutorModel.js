const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const tutor = sequelize.define(
    "tutor",
    {
      idtutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tutor_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      tutor_apellido: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      tutor_cedula: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },

      tutor_correo: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      tutor_tlf: {
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
  return tutor;
};
