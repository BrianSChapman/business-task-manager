const express = require("express");
const id = require("./helpers/uuid");
const path = require("path");
const fs = require("fs");
// const notes = require("./db/notes.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Reading file first to establish existing notes
fs.readFile("./db/notes.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  const notes = JSON.parse(data); 
  
  app.get("/api/notes", (req, res) => {
    res.json(notes);
  })
});
  
  app.post("/api/notes", (req, res) => {
    console.log(`${req.method} request received to add an additional note.`);
  
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title,
        text,
        note_id: id(),
      };
      notes.push(newNote);
      
      fs.writeFile(
          "./db/notes.json",
          JSON.stringify(notes, null,'\t'),
          (err) =>
            err ? console.log(err) : console.info("Successfully saved your note.")
        );
      }});
  


app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//     const response = {
//       status: "success",
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json("Error in saving your note.");
//   }
// });



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
