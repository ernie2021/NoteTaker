// ***Worked together with Jesus Perea on this assigment*** //

//require variables go here//
const express = require("express");

const path = require("path");

const db = require("./db/db.json")

const fs = require('fs')

const app = express();

//PORT environment // 
const PORT = process.env.PORT || 3002;

 
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
res.json(notes)
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync("./db/db.json"))
  console.log(newNote)
    notes.push(newNote)
    
 //use fs to write to the dbjson file notes after pushing
 fs.writeFileSync("./db/db.json", JSON.stringify(notes))
 res.json(newNote)
});

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, "public", 'notes.html')));

app.get('*', (req, res) => res.sendFile(path.join(__dirname, "public", 'index.html')));

app.listen(PORT, () => console.log(`App listening on PORT http://localhost:${PORT}`));