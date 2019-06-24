const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/stats", controllers.profile.statsGet);
router.get("/result:id", controllers.profile.resultsGet);
module.exports = router;
