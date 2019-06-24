const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/index", controllers.standings.standingsGet);
module.exports = router;
