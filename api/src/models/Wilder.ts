const { Schema, model } = require("mongoose");

const WilderSchema = new Schema({
  name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, votes: Number }],
});
const WilderModel = model("wilder", WilderSchema);

export default WilderModel;
