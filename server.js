const express = require("express");
const id = require("./helpers/uuid");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
// HTML ROUTES
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Setting a listener for the port.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
