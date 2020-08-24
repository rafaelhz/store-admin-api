require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Api listening on port ${PORT}!`);
});

module.exports = server;
