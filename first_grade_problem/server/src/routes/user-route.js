const controllers = require("../controllers");
const express = require('express');
const router = express.Router();

router.post("/register", controllers.user.register);
router.post("/login", controllers.user.login)
module.exports = router;
