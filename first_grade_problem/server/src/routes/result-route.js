const controllers = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/add:id", controllers.result.resultPost);

module.exports = router;
