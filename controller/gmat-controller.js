const GMATModel = require("../models/gmat-model");

const GMATController = {
  getFinalMark: async (req, res) => {
    try {
      const data = await GMATModel.getFinalMark(req.body);

      return res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err });
    }
  },
};

module.exports = GMATController;
