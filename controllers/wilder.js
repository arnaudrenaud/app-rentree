const WilderModel = require("../models/Wilder");

const createWilder = (req, res) => {
  WilderModel.init().then(() => {
    const wilder = WilderModel(req.body);
    wilder
      .save()
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.status(500).json({ success: false, result: err });
      });
  });
};

const getAllWilders = (req, res) => {
  WilderModel.init().then(() => {
    WilderModel.find().then((wilders) => {
      res.json({ success: true, result: wilders });
    });
  });
};

module.exports = {
  createWilder,
  getAllWilders,
};
