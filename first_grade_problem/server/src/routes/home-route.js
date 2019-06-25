const controllers = require("../controllers");
const express = require("express");
const router = express.Router();
//listen for routes and we call the controllers
router.get("/homescreen", controllers.home.homescreenGet);
module.exports = router;
