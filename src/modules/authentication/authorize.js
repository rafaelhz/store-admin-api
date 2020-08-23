const { Unauthorized, Forbidden } = require("../../utils/errors");
const { decodeToken } = require("./services/auth");

module.exports = (requiredRoles) => async (req, _res, next) => {
  const auth = req.get("authorization");

  if (!auth) {
    return next(new Unauthorized("Authorization header not sent"));
  }

  const token = await decodeToken(auth.substring("Bearer".length).trim());

  if (token && token.user) {
    if (!requiredRoles.includes(token.user.role)) {
      return next(new Forbidden("Forbidden access to this resource"));
    }

    req.user = token.user;
    return next();
  }

  return next(new Unauthorized("Invalid token"));
};
