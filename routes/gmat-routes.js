const express = require("express");
const GMATController = require("../controller/gmat-controller");
const router = express.Router();

router.post("/final-mark", GMATController.getFinalMark);
router.get("/data", GMATController.getAll);

module.exports = router;
