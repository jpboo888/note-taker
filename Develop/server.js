const express = require("express")
const fs = require("fs")
const path = require("path")
const uuid = require("uuid")
const notes = require("./db/db.json")

const apiRoutes = require("./routes/apiRoutes")
const htmlRoutes = require("./routes/htmlRoutes")

const PORT = process.env.PORT || 3004;
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)


  // API Route | GET

  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
    })

  app.get("api/notes", (req, res) =>  {
    res.sendFile(__dirname, "./db/db.json")
  })

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
    })
  
  app.post("/api/notes", (req, res) =>  {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"))
    const newNotes = req.body
    newNotes.id = uuid.v4()
    notes.push(newNotes)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
  })

app.delete("/api/notes:id", (req, res) =>  {
  const notes = JSON.parse(fs.readFileSync("./public/index.html"))
  const delNote = notes.filter((rmvNote) => rmvNote.id !== req.params.id)
  fs.writeFileSync("./db/db.json", JSON.stringify(delNote))
  res.join(delNote)
})
 

    app.listen(PORT, () => {
      console.log(`API server now on port ${PORT}!`);
    });