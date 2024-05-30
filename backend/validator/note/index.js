import { NoteSchema } from './schema.js';
import InvariantError from '../../responseError/InvariantError.js';

export default {
  validateNoteSchema: (payload) => {
    const validationResult = NoteSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
