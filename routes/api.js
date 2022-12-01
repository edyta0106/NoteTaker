const router = require("express").Router();
const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v1");
const db = require("../db/db.json"); //array of obj

router.get("/notes", (req, res) => {
  //   const data = fs.readFileSync("./db/db.json", "utf8");
  //   res.json(JSON.parse(data));
  res.json(db);
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    throw new Error("note title and text cannot be blank");
  }
  const newNote = { title, text, id: uuid() };
  db.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  res.json(db);
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  // if (!title || !text) {
  //   throw new Error("note title and text cannot be blank");
  // }
  const filteredNote = notes.filter((note) => note.id !== id);
  fs.writeFileSync("./db/db.json", JSON.stringify(filteredNote));
  res.json(db);
});

module.exports = router;
