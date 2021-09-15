const express = require("express");
const mongoose = require("mongoose");
const { uniqueNamesGenerator, names } = require("unique-names-generator");

const WilderModel = require("./models/Wilder");

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/wilders-app?directConnection=true&serverSelectionTimeoutMS=2000",
    { autoIndex: true }
  )
  .then(() => {
    console.log("Connected to database");
    const app = express();

    app.get("/", (req, res) => {
      res.json({ message: "Bonjour le monde" });
    });
    app.get("/random-name", (req, res) => {
      res.json({ name: uniqueNamesGenerator({ dictionaries: [names] }) });
    });

    app.post("/wilders", (req, res) => {
      WilderModel.init().then(() => {
        const firstWilder = WilderModel({
          name: "First Wilder",
          city: "San Francisco",
          skills: [
            { title: "HTML", votes: 3 },
            { title: "React", votes: 5 },
          ],
        });
        firstWilder
          .save()
          .then((result) => {
            res.json({ result });
          })
          .catch((err) => {
            res.status(500).json({ error: err });
          });
      });
    });

    const PORT = 3001;
    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
