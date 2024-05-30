import express from 'express';
const router = express.Router();

import {
  addNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from '../controllers/noteControllers.js';
import verifyJWT from '../middleware/verifyJWT.js';

router.use(verifyJWT);
router.route('/').get(getNotes).post(addNote);
router.route('/:id').get(getNoteById).put(updateNote).delete(deleteNote);

export default router;
