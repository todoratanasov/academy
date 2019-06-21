const controllers = require("../controllers");
const express = require('express');
const router = express.Router();

router.get("/types", controllers.game.gameGet);

module.exports = router