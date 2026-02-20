const logger = require("../config/logger");

module.exports = (err, req, res, next) => {
  logger.error("Unhandled Error", {
    message: err.message,
    stack: err.stack
  });

  return res.status(500).json({
    error: "Internal Server Error",
    details: err.message
  });
};