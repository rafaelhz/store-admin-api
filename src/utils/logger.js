const { createLogger, transports } = require("winston");

module.exports = createLogger({
  level: process.env.LOG_LEVEL || "debug",
  transports: [new transports.Console()]
});