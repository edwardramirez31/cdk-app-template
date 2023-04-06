import * as Joi from 'joi';

export const createPostSchema = Joi.object({
  id: Joi.string().required(),
  body: Joi.string().required(),
});

export const updatePostSchema = Joi.object({
  body: Joi.string().required(),
});
