const controllers = require("../controllers");
const express = require("express");
const router = express.Router();
//listen for routes and we call the controllers
router.post("/register", controllers.user.registerPost);
router.post("/login", controllers.user.login);

module.exports = router;
