const express = require('express')
const router = express.Router()
const fs = require('fs')
const app = express()



// Reading file first to establish existing notes
fs.readFile("./db/notes.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);

    const notes = JSON.parse(data);
  }
});

// API ROUTES
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    console.info(`${req.method} request received to add an additional note.`);
    const newNote = {
      title,
      text,
      note_id: id(),
    };
    notes.push(newNote);

    fs.writeFile("./db/notes.json", JSON.stringify(notes, null, "\t"), (err) =>
      err ? console.log(err) : console.info("Successfully saved your note.")
    );
  }
});

// Html Routes
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

const htmlRouter = express

module.exports = router
