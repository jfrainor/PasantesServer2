const dbConfig = require("../config/dbConfig.js");
require("dotenv").config();

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  "",
  {
    dialect: "mysql",
    host: "localhost",
    timezone: "-04:00",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = require("./adminModel.js")(sequelize, DataTypes);
db.carrera = require("./carreraModel.js")(sequelize, DataTypes);
db.contenidos = require("./contenidosModel.js")(sequelize, DataTypes);
db.evaluaciones = require("./evaluacionesModel.js")(sequelize, DataTypes);
db.institucion = require("./institucionModel.js")(sequelize, DataTypes);
db.pasantes = require("./pasantesModel.js")(sequelize, DataTypes);
db.periodos = require("./periodosModel.js")(sequelize, DataTypes);
db.tipo_evaluacion = require("./tipo_evaluacion.js")(sequelize, DataTypes);
db.tutor = require("./tutorModel.js")(sequelize, DataTypes);
db.usuarios = require("./usuariosModel.js")(sequelize, DataTypes);
db.roles = require("./rolesModel.js")(sequelize, DataTypes);
db.sesiones = require("./sesionModel.js")(sequelize, DataTypes);

// Relaciones entre modelos (llaves foraneas)

db.admin.belongsTo(db.usuarios, { foreignKey: "usuario_id" });
db.usuarios.hasOne(db.admin, { foreignKey: "usuario_id" });

db.sesiones.belongsTo(db.usuarios, { foreignKey: "usuario_id" });

db.pasantes.belongsTo(db.usuarios, { foreignKey: "usuario_id" });
db.pasantes.belongsTo(db.institucion, { foreignKey: "institucion_id" });
db.pasantes.belongsTo(db.carrera, { foreignKey: "carrera_id" });

db.tutor.belongsTo(db.usuarios, { foreignKey: "usuario_id" });
db.usuarios.hasOne(db.tutor, { foreignKey: "usuario_id" });
db.tutor.hasMany(db.pasantes, { foreignKey: "tutor_id" });
db.tutor.belongsTo(db.institucion, { foreignKey: "institucion_id" });
db.carrera.hasMany(db.tutor, { foreignKey: "carrera_id" });

db.usuarios.belongsTo(db.roles, { foreignKey: "role_id" });
db.roles.hasMany(db.usuarios, { foreignKey: "role_id" });

db.contenidos.hasOne(db.evaluaciones, { foreignKey: "contenido_id" });
db.evaluaciones.belongsTo(db.contenidos, { foreignKey: "contenido_id" });

db.tipo_evaluacion.hasOne(db.evaluaciones, { foreignKey: "tipo_evaluacion_id" });
db.evaluaciones.belongsTo(db.tipo_evaluacion, { foreignKey: "tipo_evaluacion_id" });


/* db.admin.belongsTo(db.usuarios, { foreignKey: "usuario_id" });

db.sesiones.belongsTo(db.usuarios, { foreignKey: "userId" });

db.pasantes.belongsTo(db.usuarios, { foreignKey: "usuario_id" });
db.pasantes.belongsTo(db.institucion, { foreignKey: "institucion_id" });
db.pasantes.belongsTo(db.carrera, { foreignKey: "carrera_id" });

db.tutor.belongsTo(db.usuarios, { foreignKey: "usuario_id" });
db.tutor.hasMany(db.pasantes, { foreignKey: "tutor_id" });
db.tutor.belongsTo(db.institucion, { foreignKey: "institucion_id" });

db.usuarios.hasOne(db.admin, { foreignKey: "usuario_id" });
db.usuarios.hasOne(db.tutor, { foreignKey: "usuario_id" });
db.usuarios.hasMany(db.roles, { foreignKey: "role_id" });

db.roles.hasMany(db.usuarios, { foreignKey: "role_id" });

db.carrera.hasMany(db.tutor, { foreignKey: "carrera_id" });

db.contenidos.hasOne(db.evaluaciones, { foreignKey: "idcontenido" });
db.tipo_evaluacion.hasOne(db.evaluaciones, { foreignKey: "idtipo_evaluacion" }); */

// Aquí creamos una tabla de unión para la relación belongsToMany


db.contenidos.belongsTo(db.periodos, { foreignKey: "periodo_id" });
db.contenidos.belongsToMany(db.carrera, {
  through: "contenidos_carrera",
  foreignKey: "contenido_id",
  otherKey: "carrera_id",
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database re-sync");
});

module.exports = db;
