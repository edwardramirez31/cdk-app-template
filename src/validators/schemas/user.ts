import * as Joi from 'joi';

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().required(),
});
