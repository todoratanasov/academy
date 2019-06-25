const controllers = require("../controllers");
const express = require("express");
const router = express.Router();
//listen for routes and we call the controllers
router.get("/stats", controllers.profile.statsGet);
router.get("/result:id", controllers.profile.resultsGet);
module.exports = router;
