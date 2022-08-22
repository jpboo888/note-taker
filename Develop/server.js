const express = require('express');
const path = require("path")
const data = require("./db/db.json")
const fs = require('fs')

const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    res.json(data)
})

//receives the data from the server and sends it to the db.json
app.post("/api/notes", (req, res) => {
    console.log(req.body)

//push the contents of req.body
    data.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(data), () => {
        res.send("successfully added!")
    })

})

app.delete("/api/notes:id", (req, res) =>  {
    const notes = JSON.parse(fs.readFileSync("./public/index.html"))
    const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id)
    fs.writeFileSync("./db/db.json", JSON.stringify(delNote))
    res.join(delNote)
  })

app.listen(3001, () => {
    console.log("Server is running")
})