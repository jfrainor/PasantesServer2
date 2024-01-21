const routes = {};

routes.usuarios = require("./UsuarioRoute.js");
routes.pasantes = require("./PasanteRoute.js");
routes.tutores = require("./TutorRoute.js");
routes.instituciones = require("./InstitucionRoute.js");
routes.login = require("./AuthRoute.js");
module.exports = routes;
