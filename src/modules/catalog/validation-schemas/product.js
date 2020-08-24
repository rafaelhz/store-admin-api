const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(80).required(),
  description: Joi.string().trim().min(3).max(255).required(),
  imageUrl: Joi.string().required(),
  categoryId: Joi.number().integer().required(),
  price: Joi.number().integer().required(),
});

module.exports = schema;
