const express = require("express");
const authUser = require("../middlewares/authUser");
const router = express.Router();
const { getAllNotes, addNotes, updateNotes, deleteNotes } = require("../controllers/notesController")

router.get('/', authUser, getAllNotes);
router.post('/add', authUser, addNotes);
router.post('/update/:id', authUser, updateNotes);
router.delete('/delete/:id', authUser, deleteNotes);

module.exports = router;
