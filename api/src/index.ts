import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import {
  createWilder,
  getAllWilders,
  deleteWilder,
  updateWilder,
} from "./controllers/wilder";
import WilderModel from "./models/Wilder";

dotenv.config();

const runServer = async () => {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) {
    throw Error("A MONGO_URL must be provided in environment.");
  }
  await mongoose.connect(MONGO_URL, { autoIndex: true });

  // eslint-disable-next-line no-console
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
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
};

runServer();
