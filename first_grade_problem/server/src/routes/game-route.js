const controllers = require("../controllers");
const express = require("express");
const router = express.Router();
//listen for routes and we call the controllers
router.get("/types", controllers.game.gameIndexGet);
router.get("/single", controllers.game.gameSingleGet);
router.get("/playboard", controllers.game.gamePlayboardGet);
module.exports = router;
