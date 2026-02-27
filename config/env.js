require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  ACTIVE_TTS_PROVIDER: process.env.ACTIVE_TTS_PROVIDER || "gemini",
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || false,
  NODE_ENV: process.env.NODE_ENV || "development",
};