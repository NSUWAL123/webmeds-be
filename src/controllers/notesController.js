const Note = require("../models/noteModel")

const getAllNotes = async (req, res) => {
    const getNotes = await Note.find({
        userId: req.user.id
    })

    res.json({getNotes});
}

const addNotes = async (req, res) => {
    const userId = req.user.id;
    const {title, description} = req.body;
    console.log(userId, title, description)

    const newNote = await Note.create({
        userId: userId,
        title: title,
        description: description
    })

    const noteId = newNote._id;

    res.json({
        _id: noteId,
        userId,
        title,
        description
    })
}

const updateNotes = async (req, res) => {
    const {title, description} = req.body;
    const updateNote = await Note.findByIdAndUpdate(req.params.id, {
        title: title,
        description: description
    })

    res.json("Update successfully.")
}

const deleteNotes = async (req, res) => {
    const deleteNote = await Note.findByIdAndDelete(req.params.id)

    const title = deleteNote.title;
    res.send(`Note with titel: ${title} is successfully deleted.`)
}

module.exports = {
    getAllNotes,
    addNotes,
    updateNotes,
    deleteNotes
}