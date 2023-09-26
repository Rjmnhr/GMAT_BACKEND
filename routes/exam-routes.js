const express = require("express");
const ExamController = require("../controller/exam_controller");
const router = express.Router();

router.post("/store-data", ExamController.storeExamData);
router.post("/get-data", ExamController.getUserExamData);

module.exports = router;
