const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/register", controllers.event.registerEventPost);
router.get("/events", controllers.event.activeEventsGet);

module.exports = router;
