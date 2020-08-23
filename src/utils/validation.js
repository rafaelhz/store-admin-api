const { BadRequest } = require("./errors");

module.exports = (schema, property = "body") => {
  return (req, _res, next) => {
    const { error } = schema.validate(req[property]);

    if (error == null) {
      return next();
    }

    const message = error.details.map((i) => i.message).join(",");

    throw new BadRequest(message);
  };
};
