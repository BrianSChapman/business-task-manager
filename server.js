const express = require("express");
const path = require("path");
const fs = require("fs");
const notes = require("./db/notes.json");
const id = require("./helpers/uuid");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  if (req.body) {
    const newTask = {
      title,
      text,
      id: id(),
    };
    readAndAppend(newTask, "./db/notes.json");
    res.json("Note added");
  } else {
    res.json("There's been an error creating your note");
  }

  // const list = JSON.parse(fs.readFileSync("./db/notes.json", "utf8"));

  
  // saveNotes();
});

// function saveNotes() {
//   fs.writeFile("./db/notes.json", JSON.stringify(notes, "\t"), (err) =>
//     err ? console.log(err) : console.info("Successfully made changes")
//   );
//   return true;
// }

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
