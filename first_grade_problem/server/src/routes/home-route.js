const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/homescreen", controllers.home.homescreenGet);
module.exports = router;
