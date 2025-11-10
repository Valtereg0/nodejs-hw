import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};


export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(req.params.noteId);
  if (!note) {
    throw createHttpError(404, 'Note not found');
  }
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`
  });
};


export const createNote = async (req, res) => {

  const note = await Note.create(req.body);
  res.status(201).json({note});
};


export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  await Note.findOneAndDelete({ _id: noteId });

  if (!noteId) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    message: 'Delete note'
  });
};


export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  await Note.findOneAndUpdate({ _id: noteId }, req.body, { new: true });

  if (!noteId) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json({
    message: 'Update note'
  });
};
