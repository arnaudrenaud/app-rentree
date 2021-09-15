const express = require("express");
const mongoose = require("mongoose");

const { createWilder, getAllWilders } = require("./controllers/wilder");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/wilders-app?directConnection=true&serverSelectionTimeoutMS=2000",
    { autoIndex: true }
  )
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
