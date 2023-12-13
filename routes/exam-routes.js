const express = require("express");
const ExamController = require("../controller/exam_controller");
const router = express.Router();

router.post("/store-data", ExamController.storeExamData);
router.post("/get-data", ExamController.getUserExamData);
router.post("/store-data-focus", ExamController.storeExamDataFocus);
router.post("/get-data-focus", ExamController.getUserExamDataFocus);

module.exports = router;
