const { uniqueNamesGenerator, names } = require("unique-names-generator");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Bonjour le monde" });
});
app.get("/random-name", (req, res) => {
  res.json({ name: uniqueNamesGenerator({ dictionaries: [names] }) });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
