import { QuerySchema } from './schema.js';
import InvariantError from '../../responseError/InvariantError.js';

export default {
  validateQuerySchema: (payload) => {
    const validationResult = QuerySchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
