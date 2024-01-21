const TutorController = require("../controllers/tutorController.js");
const router = require("express").Router();

router.post("/registrar", TutorController.addTutor);

router.get("/getAll", TutorController.getAll);

module.exports = router;
