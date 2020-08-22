require("dotenv").config();
const app = require("./app");

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Api listening on port ${PORT}!`);
});

module.exports = server;
