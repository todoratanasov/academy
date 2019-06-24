const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/types", controllers.game.gameIndexGet);
router.get("/single", controllers.game.gameSingleGet);
router.get("/playboard", controllers.game.gamePlayboardGet);
module.exports = router;
