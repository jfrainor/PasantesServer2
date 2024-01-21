const UsuarioController = require("../controllers/usuarioController");
const router = require("express").Router();

router.post("/registrarPasante", UsuarioController.addUserPasante);

router.post("/registrarUsuario", UsuarioController.addUser);

router.get("/getAll", UsuarioController.getAll);

router.get("/:id", UsuarioController.getUsuario);

module.exports = router;
