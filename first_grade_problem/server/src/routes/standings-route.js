const controllers = require("../controllers");
const express = require("express");
const router = express.Router();
//listen for routes and we call the controllers
router.get("/index", controllers.standings.standingsGet);
module.exports = router;
