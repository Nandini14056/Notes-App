const mongoose = require("mongoose");
const Note = require("../model/note.model");

const getAllNotes = async (req, res) => {
  try {
    //get data
    const owner = req.user;

    //check if all data found
    if (!owner) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    //get all notes
    const notes = await Note.find({ owner: owner._id });

    //return response
    return res.status(200).json({
      notes,
      message: "Notes fetched successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!owner) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        message: "title and content is required"
      });
    }

    const createNote = await Note.create({
      title,
      content,
      owner: req.user._id
    });

    return res.status(201).json({
      createNote,
      message: "Note created successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).json({
        message: "Invalid Note ID"
      });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (note.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not authorized to view this note"
      });
    }

    return res.status(200).json({
      note,
      message: "Note fetched successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const ownerId = req.user._id;

    if (!noteId) {
      return res.status(400).json({
        message: "Invalid noteId"
      });
    }

    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    if (note.owner.toString() !== ownerId.toString()) {
      return res.status(403).json({
        message: "You are not authorized to update this note"
      });
    }

    note.title = title;
    note.content = content;

    await note.save();

    return res.status(200).json({
      note,
      message: "Note updated successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;

    if (!noteId) {
      return res.status(400).json({
        message: "Invalid noteId"
      });
    }

    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    return res.status(200).json({
      message: "note deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  createNotes,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote
}