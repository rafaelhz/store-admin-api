const logger = require("../utils/logger");

class HttpError extends Error {}

class BadRequest extends HttpError {
  get httpStatusCode() {
    return 400;
  }
}

class Unauthorized extends HttpError {
  get httpStatusCode() {
    return 401;
  }
}

class Forbidden extends HttpError {
  get httpStatusCode() {
    return 403;
  }
}

class NotFound extends HttpError {
  get httpStatusCode() {
    return 404;
  }
}

const asyncMiddleware = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

const apiErrorHandler = (err, _req, res, _next) => {
  if (err instanceof HttpError) {
    res.status(err.httpStatusCode).json({ error: err.message || String(err) });
    return;
  }

  logger.error(`Unexpected error: ${err.message}`, err);

  res
    .status(500)
    .json({ error: "Oops, something went wrong. Please try again later." });
};

module.exports = {
  apiErrorHandler,
  asyncMiddleware,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
};
