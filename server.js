const express = require("express");
const id = require("./helpers/uuid");
const path = require("path");
const fs = require("fs");
const notes = require("./db/notes.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Serving request for initial landing page.
app.get("./", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("./notes", (req, res) =>
res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Parse and deliver the notes from our DB when requested.
app.get("/db/notes", (req, res) => res.json(notes));

// Logging the request for a new note post.
app.post("/db/notes", (req, res) => {
res.json(`${req.method} request received to add an additional note`)
  console.log(`${req.method} request received to add an additional note.`)


// Destructing the notes for req.body.
const { title, text } = req.body;

// Creating a new note if all properties are provided.
if (title && text) {
  const newNote = {
    title,
    text,
    note_id: id(),
  };
//   account for notes that already exist in database.
  fs.readFile("/db/notes.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const noteParsed = JSON.parse(data);
      noteParsed.push(newNote);
    }
    fs.writeFile("/db/notes.json", JSON.stringify(noteParsed, null, "\t"), (err) =>
      err ? console.log(err) : console.info("Successfully saved your note.")
    );
  });


const response = {
    status: 'success',
    body: newNote,
};

console.log(response);
res.status(201).json(response);
} else {
    res.status(500).json('Error in saving your note.');
}

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
