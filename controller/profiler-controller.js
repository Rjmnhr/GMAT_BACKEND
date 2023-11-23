const ProfilerModel = require("../models/profiler-modeljs");

const ProfilerController = {
  getIndividualValues: async (req, res) => {
    try {
      const data = await ProfilerModel.getIndividualValues(req.body);

      res.status(200).json(data);
    } catch (err) {
      console.error(err);

      res.status(500).json({ message: err });
    }
  },
};

module.exports = ProfilerController;
