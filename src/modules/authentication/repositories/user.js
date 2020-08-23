const { db } = require("../../../db");

const getUserByEmail = (email) => {
  return db("users").where({ email }).first();
};

module.exports = {
  getUserByEmail,
};
