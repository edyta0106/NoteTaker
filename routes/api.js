const router = require("express").Router();
const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v1");
let db = require("../db/db.json"); //array of obj

// GET route that access the notes
router.get("/notes", (req, res) => {
  //   const data = fs.readFileSync("./db/db.json", "utf8");
  //   res.json(JSON.parse(data));
  res.json(db);
});

// POST route that captures user's title and text input
router.post("/notes", (req, res) => {
  const { title, text } = req.body;
  // both title and text have to be included otherwise you get an error
  if (!title || !text) {
    throw new Error("note title and text cannot be blank");
  }
  // newNote adds a random id for each user input of title and text
  const newNote = { title, text, id: uuid() };
  // push will append new notes to the db array of objects
  db.push(newNote);
  // writing the notes to file using JSON.stringify
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  console.log("db.json has been updated");
  res.json(db);
});

// DELETE route allow user to delete any notes saved
router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  db = db.filter((obj) => obj.id !== id);
  fs.writeFileSync("./db/db.json", JSON.stringify(db));
  console.log(db);
  res.json(db);
});

module.exports = router;
