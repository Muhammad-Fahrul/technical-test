import Joi from 'joi';

export const QuerySchema = Joi.object({
  title: Joi.string().empty(''),
  page: Joi.number().empty(''),
});
