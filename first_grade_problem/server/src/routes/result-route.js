const controllers = require("../controllers");
const express = require("express");
const router = express.Router();
//listen for routes and we call the controllers
router.post("/add:id", controllers.result.resultPost);

module.exports = router;
