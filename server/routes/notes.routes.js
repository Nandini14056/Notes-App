const express = require('express');
const { createNotes, getNote, getAllNotes, updateNote, deleteNote } = require("../controller/notes.controller");

const router = express.Router();

router.post('/', createNotes);

router.get('/', getAllNotes);

router.get('/:id', getNote);

router.put('/:id', updateNote);

router.delete('/:id', deleteNote)

module.exports = router;