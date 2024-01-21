const loginController = require("../controllers/loginController.js");
const router = require("express").Router();

router.post("/login", loginController.login);
router.post("/check", loginController.checkToken);

module.exports = router;
