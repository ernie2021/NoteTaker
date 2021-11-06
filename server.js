//require express
const express = require("express");
//require path
const path = require("path");
//require db.json
const db = require(path.join(__dirname, "db", "db.json"))
//require fs
const fs = require('fs');
const { dirname } = require("path");
//define express as app
let app = express();

//define port for local and heroku
let PORT = process.env.PORT || 3000

//middle ware for static files
app.use(express.static('public'))
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//define get for /notes to serve notes.html
app.get("/notes", (req, res) => {
    //serving the index using path to join the paths
    res.sendFile(path.join(__dirname, "public", "notes.html"))   
});

//define get for /api/notes
app.get("/api/notes", (req, res) => {
    let dbContent = JSON.parse(fs.readFileSync(path.join(__dirname, "db","db.json")));
    res.json(dbContent)
})

//define first get for / to direct to /public/index.html
app.get("*", (req, res) => {
    //serving the index using path to join the paths
    res.sendFile(path.join(__dirname, "public", "index.html")); 

});
//define post for /api/notes
app.post("/api/notes", (req, res) => {
    //defining new note
    const newNote = req.body;
    //gathering the db data
    let dbContent = JSON.parse(fs.readFileSync(path.join(__dirname, "db","db.json")))
    if(dbContent.length > 0) {
        newNote.id = dbContent[dbContent.length -1 ].id + 1;
    }else {
        newNote.id = 1
    };
    console.log(newNote.id)
    //adding new note to dbContent
    dbContent.push(newNote)
    //Serialize dbContent as JSON and Write it to a file
    fs.writeFile(path.join(__dirname, "db", "db.json"), JSON.stringify(dbContent, null, 2), (err) => {
        if (err) {
            console.log(err)
        }
        res.send("Success")
    });
})
//define delete for /api/notes
app.delete('/api/notes/:note', (req, res) => {
    let dbContent = [];
    let noteToDelete = req.params.note;
    fs.readFile(path.join(__dirname, "db", "db.json"), (err, data) => {
        if (err) {
            console.log(err);
        }
        dbContent = JSON.parse(data);
        for (const key in dbContent) {
            const element = dbContent[key];
            if (element.id == noteToDelete) {
                console.log(dbContent);
                console.log(noteToDelete);
                const sameId = (element) => element.id == noteToDelete
                console.log(dbContent.findIndex(sameId))
                dbContent.splice(dbContent.findIndex(sameId),1);
                console.log(dbContent)
                fs.writeFileSync(path.join(__dirname, "db", "db.json"), JSON.stringify(dbContent, null, 2))
                break;
            }
        }
    })

    res.send("Deleted")
    
})

//define listen
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}/`)
});