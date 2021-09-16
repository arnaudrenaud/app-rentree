const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();

const {
  createWilder,
  getAllWilders,
  deleteWilder,
  updateWilder,
} = require("./controllers/wilder");
const WilderModel = require("./models/Wilder");

const runServer = async () => {
  await mongoose.connect(process.env.MONGO_URL, { autoIndex: true });
  console.log("Connected to database");

  await WilderModel.init();

  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get("/wilders", getAllWilders);
  app.post("/wilders", createWilder);
  app.put("/wilders/:name", updateWilder);
  app.delete("/wilders/:name", deleteWilder);

  app.use((req, res) => {
    res
      .status(404)
      .json({ success: false, result: "Ressource does not exist." });
  });

  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
};

runServer();
