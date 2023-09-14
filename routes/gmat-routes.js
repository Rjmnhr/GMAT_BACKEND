const express = require("express");
const GMATController = require("../controller/gmat-controller");
const router = express.Router();

router.post("/final-mark", GMATController.getFinalMark);

module.exports = router;
