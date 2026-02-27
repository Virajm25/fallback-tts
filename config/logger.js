const { createLogger, format, transports } = require("winston");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: isProduction ? "warn" : "info",
  format: format.combine(
    format.timestamp(),
    format.json() 
  ),
  transports: [
    new transports.Console(),

    ...(isProduction
      ? [
          new transports.File({
            filename: path.join("logs", "error.log"),
            level: "error",
          }),
          new transports.File({
            filename: path.join("logs", "combined.log"),
          }),
        ]
      : []),
  ],
});

module.exports = logger;