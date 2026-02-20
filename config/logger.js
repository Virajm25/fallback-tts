const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.json()   // structured logs for production
  ),
  transports: [
    new transports.Console()
  ]
});

module.exports = logger;