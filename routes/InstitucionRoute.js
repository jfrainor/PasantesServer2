const InstitucionController = require("../controllers/institucionController.js");
const router = require("express").Router();

router.post("/registrar", InstitucionController.addInstitucion);

router.get("/getAll", InstitucionController.getAll);

router.get("/:id", InstitucionController.getInstitucion);

module.exports = router;
