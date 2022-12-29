const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/notes.json");
const noteId = require("./helpers/uuid");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


  //  path to the notes page after clicking button.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//  send all notes in json format.
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/notes.json"));
});

// Homepage route
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// Post new note and save to left-hand column
app.post("/api/notes", (req, res) => {
  const postedNote = req.body;
  notes.push(postedNote);

  // create an id number
  for (let i =0; i < notes.length; i++) {
    note = notes[i];
    note.id = i + 1;
  }

  fs.writeFile("./db/notes.json", JSON.stringify(notes, "\t"), (err) =>
    err ? console.log(err) : console.log("Successfully made changes")
  );
  res.status(201).json('Successfully added note.');
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

app.delete("/api/notes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
})
