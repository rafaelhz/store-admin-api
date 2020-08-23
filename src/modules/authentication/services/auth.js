const jwt = require("jsonwebtoken");

const { JWT_SECRET, JWT_ALGORITHM } = process.env;
const { Unauthorized } = require("../../../utils/errors");
const crypto = require("../../../utils/crypto");
const userRepository = require("../repositories/user");

const LOGIN_FAILED_MSG = "Invalid username or password";

const createAccessToken = async (user) => {
  return {
    accessToken: await jwt.sign(
      {
        user,
      },
      JWT_SECRET,
      { algorithm: JWT_ALGORITHM, expiresIn: "30 days" }
    ),
  };
};

const login = async (email, password) => {
  if (!email || !password) {
    throw new Unauthorized(LOGIN_FAILED_MSG);
  }

  const user = await userRepository.getUserByEmail(email);

  if (!user || !(await crypto.bcryptCompare(password, user.password))) {
    throw new Unauthorized(LOGIN_FAILED_MSG);
  }

  return createAccessToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

const decodeToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return;
  }
};

module.exports = {
  login,
  decodeToken,
};
