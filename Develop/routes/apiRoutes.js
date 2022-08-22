const path = require("path")
const router = require("express").Router()

router.post("/api/notes", (req, res) =>  {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"))
    const newNotes = req.body
    newNotes.id = uuid.v4()
    notes.push(newNotes)
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes)
  })


module.exports = router