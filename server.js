const express = require("express");
const id = require("./helpers/uuid");
const path = require("path");
const fs = require("fs");
const router = require("./Routes/routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use('/routes', router)
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));




// Setting a listener for the port.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
