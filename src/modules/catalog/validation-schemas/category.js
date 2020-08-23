const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().trim().min(3).max(80).required(),
});

module.exports = schema;
