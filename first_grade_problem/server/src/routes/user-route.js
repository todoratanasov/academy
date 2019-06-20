const controllers = require("../controllers");
const express = require('express');
const router = express.Router();

router.get("/register", controllers.user.registerGet);
router.post("/register", controllers.user.register);
router.get("/login", controllers.user.loginGet);
router.post("/login", controllers.user.login);

module.exports = router;
