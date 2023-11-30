const express = require("express");
const ProfilerController = require("../controller/profiler-controller");

const router = express.Router();

router.post("/individual", ProfilerController.getIndividualValues);
router.post("/total", ProfilerController.getTotalValues);
router.post("/college-information", ProfilerController.getCollegeInformation);

module.exports = router;
