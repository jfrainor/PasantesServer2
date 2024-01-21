const PasanteController = require("../controllers/pasanteController.js");
const router = require("express").Router();

router.post("/registrar", PasanteController.addPasante);

router.get("/getAll", PasanteController.getAll);

module.exports = router;
