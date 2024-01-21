const Sequelize = require("sequelize");
const { DataTypes } = Sequelize;
module.exports = (sequelize, DataTyples) => {
  const institucion = sequelize.define(
    "institucion",
    {
      idinstitucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      nro_contacto: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      verificada: {
        type: DataTypes.TINYINT(),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return institucion;
};
