const express = require("express");
const ProfilerController = require("../controller/profiler-controller");

const router = express.Router();

router.post("/individual", ProfilerController.getIndividualValues);
router.post("/total", ProfilerController.getTotalValues);

module.exports = router;
