const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/register", controllers.event.registerEventPost);
router.get("/events", controllers.event.activeEventsGet);
router.get("/event:id", controllers.event.eventGet);

module.exports = router;
