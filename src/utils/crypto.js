const bcrypt = require("bcrypt");

const saltRounds = 10;

const getPasswordHash = (password) => {
  return bcrypt.hash(password, saltRounds);
};

const bcryptCompare = (password, encryptedPassword) => {
  return bcrypt.compare(password, encryptedPassword);
};

module.exports = {
  getPasswordHash,
  bcryptCompare,
};
