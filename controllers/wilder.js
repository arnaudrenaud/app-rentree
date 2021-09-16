const WilderModel = require("../models/Wilder");

const createWilder = async (req, res) => {
  const wilder = WilderModel(req.body);
  try {
    const result = await wilder.save();
    res.json({ success: true, result: result });
  } catch (error) {
    res.status(400).json({ success: false, result: error.message });
  }
};

const deleteWilder = async (req, res) => {
  const name = req.params.name;
  const result = await WilderModel.deleteOne({ name });
  if (result.deletedCount === 0) {
    res.status(404).json({ success: false, result: "Wilder does not exist." });
  }
  res.json({ success: true, result: result });
};

const getAllWilders = async (req, res) => {
  const wilders = await WilderModel.find();
  res.json({ success: true, result: wilders });
};

module.exports = {
  createWilder,
  deleteWilder,
  getAllWilders,
};
