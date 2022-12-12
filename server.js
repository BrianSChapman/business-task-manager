const express = require('express');
const path = require('path');
const fs = require('fs');
const { get } = require('http');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.status('public'));
app.use(express.static(path.join(__dirname, 'public')));

app,get('./', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
})












app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);