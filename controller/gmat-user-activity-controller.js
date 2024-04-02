const GmatUserActivityModel = require("../models/gmat-user-activity-model");
const getUserID = require("../utils/getUserID");

const GmatUserActivityController = {
  getUserActivity: async (req, res) => {
    const userID = getUserID(req);
    try {
      const data = await GmatUserActivityModel.getUserActivity(userID);

      res.status(200).json({ status: 200, data: data });
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err });
    }
  },
  saveUserActivity: async (req, res) => {
    const userID = getUserID(req);
    try {
      const { category, practice_exam } = req.body;

      const scoreCardId = `${category}_${userID}_${practice_exam}`;
      const response = await GmatUserActivityModel.getByScoreCardId(
        scoreCardId
      );

      if (response[0]?.count > 0) {
        const updateActivity = await GmatUserActivityModel.updateUserActivity(
          userID,
          req.body,
          scoreCardId
        );

        if (updateActivity) {
          const updateScoreCard = await GmatUserActivityModel.updateScoreCard(
            userID,
            req.body,
            scoreCardId
          );
        }

        res
          .status(200)
          .json({ status: 200, message: "Activity updated  successfully" });
      } else {
        const saveActivity = await GmatUserActivityModel.saveUserActivity(
          userID,
          req.body,
          scoreCardId
        );

        if (saveActivity) {
          const saveScoreCard = await GmatUserActivityModel.saveScoreCard(
            userID,
            req.body,
            scoreCardId
          );
        }

        res
          .status(200)
          .json({ status: 200, message: "Activity saved successfully" });
      }
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err });
    }
  },
  updateUserActivityStatus: async (req, res) => {
    const userID = getUserID(req);
    try {
      const { category, practice_exam } = req.body;

      const scoreCardId = `${category}_${userID}_${practice_exam}`;
      const response = await GmatUserActivityModel.updateUserActivityStatus(
        scoreCardId
      );

      res.status(200).json({ status: 200, message: "Activity status updated" });
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err });
    }
  },
  updateScoreCard: async (req, res) => {
    const userID = getUserID(req);
    try {
      const { category, practice_exam } = req.body;

      const scoreCardId = `${category}_${userID}_${practice_exam}`;
      const response = await GmatUserActivityModel.updateScoreCard(
        userID,
        req.body,
        scoreCardId
      );

      res.status(200).json({ status: 200, message: "Score card  updated" });
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err });
    }
  },
};

module.exports = GmatUserActivityController;
