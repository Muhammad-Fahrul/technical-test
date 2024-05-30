import notes from '../models/notes.js';
const notesDB = {
  notes,
  setNotes: function (data) {
    this.notes = data;
  },
};

import NoteValidator from '../validator/note/index.js';

const addNote = (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).send('title and desc tidak boleh kosong');
  }

  NoteValidator.validateNoteSchema({ title, desc });

  const notes = notesDB.notes;

  const length = Number(notes.length);

  let noteId = length === 0 ? 1 : length + 1;

  const existNote = notes.filter((n) => n.id === noteId)[0];

  if (existNote) {
    noteId = length + 2;
  }

  const newNote = { id: noteId, title: title.toLocaleLowerCase(), desc };

  notes.push(newNote);

  notesDB.setNotes(notes);

  res
    .status(201)
    .json({ data: { noteId, message: 'note berhasil ditambahkan' } });
};

const getNotes = (req, res) => {
  const title = req.query.title || '';
  const page = parseInt(req.query.page) || 1; // Default page to 1 if not provided
  const limit = 5; // Limit to 5 notes per page

  const notes = notesDB.notes;

  // Filter notes based on title if provided
  const filteredNotes = title
    ? notes.filter((note) => note.title.includes(title.toLocaleLowerCase()))
    : notes;

  // Calculate the start and end indices for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Get the paginated notes
  const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

  res.json({
    notes: paginatedNotes,
    currentPage: page,
    totalPages: Math.ceil(filteredNotes.length / limit),
  });
};

const getNoteById = (req, res) => {
  const notes = notesDB.notes;

  const note = notes.filter((n) => n.id === Number(req.params.id))[0];

  if (!note) {
    return res.status(400).json({ message: 'note not found' });
  }

  res.json({ ...note });
};

const updateNote = (req, res) => {
  const { title, desc } = req.body;

  if (!title || !desc) {
    return res.status(400).send('Title and desc tidak boleh kosong');
  }

  NoteValidator.validateNoteSchema({ title, desc });

  const notes = notesDB.notes;

  const note = notes.filter((n) => n.id === Number(req.params.id))[0];

  if (!note) {
    return res.status(400).json({ message: 'note not found' });
  }

  const noteId = note.id;

  let newNotes = notes.filter((n) => n.id !== noteId);

  newNotes.push({
    id: noteId,
    title: title.toLocaleLowerCase(),
    desc,
  });

  notesDB.setNotes(newNotes);

  res.json({ message: 'note berhasil diperbarui' });
};

const deleteNote = (req, res) => {
  const notes = notesDB.notes;

  if (!notes) {
    return res.status(400).json({ message: 'gagal menghapus note' });
  }

  const note = notes.filter((n) => n.id === Number(req.params.id))[0];

  if (!note) {
    return res.status(400).json({ message: 'note not found' });
  }

  const noteId = note.id;

  let newNotes = notes.filter((n) => n.id !== noteId);

  notesDB.setNotes(newNotes);

  res.json({ message: 'note berhasil dihapus' });
};

export { addNote, getNotes, getNoteById, updateNote, deleteNote };
