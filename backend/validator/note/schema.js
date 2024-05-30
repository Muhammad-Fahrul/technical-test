import Joi from 'joi';

export const NoteSchema = Joi.object({
    title: Joi.string().required(),
    desc: Joi.string().required(),
})