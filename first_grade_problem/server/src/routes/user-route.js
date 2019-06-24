const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/register", controllers.user.registerGet);
router.post("/register", controllers.user.registerPost);
router.get("/login", controllers.user.loginGet);
router.post("/login", controllers.user.login);

module.exports = router;
