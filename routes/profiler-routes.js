const express = require("express");
const ProfilerController = require("../controller/profiler-controller");

const router = express.Router();

router.post("/individual", ProfilerController.getIndividualValues);

module.exports = router;
