// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require('express');

const path = require("path");

const db = require("./db/db.json")

const fs = require('fs')


// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3002;

//const PORT = 8080;// //without Heroku server

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,"public", 'notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname,"public", 'index.html')));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});