const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/events", controllers.home.allEventsGet);

module.exports = router;
