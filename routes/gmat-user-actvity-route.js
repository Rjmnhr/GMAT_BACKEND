const express = require("express");
const authenticateToken = require("../utils/auth");
const GmatUserActivityController = require("../controller/gmat-user-activity-controller");
const router = express.Router();

router.get(
  "/get-activity",
  authenticateToken,
  GmatUserActivityController.getUserActivity
);

router.post(
  "/save-activity",
  authenticateToken,
  GmatUserActivityController.saveUserActivity
);
router.post(
  "/update-status",
  authenticateToken,
  GmatUserActivityController.updateUserActivityStatus
);

router.post(
  "/update-score-card",
  authenticateToken,
  GmatUserActivityController.updateScoreCard
);
module.exports = router;
