const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

dotenv.config();

const { createWilder, getAllWilders } = require("./controllers/wilder");

mongoose
  .connect(process.env.MONGO_URL, { autoIndex: true })
  .then(() => {
    console.log("Connected to database");

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/wilders", getAllWilders);
    app.post("/wilders", createWilder);

    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
