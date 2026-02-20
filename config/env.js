require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,

  // Authentication for your microservice
  INTERNAL_API_KEY: process.env.INTERNAL_API_KEY,

  // Gemini API Key from Google AI Studio
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  // Optional: Logging environment
  NODE_ENV: process.env.NODE_ENV || "development",
};