require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("./middleware/rateLimit");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./api/tts.routes");
const logger = require("./config/logger");

const app = express();
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || false,
}));

app.use(express.json({ limit: "2mb" }));
app.use(rateLimit);

app.get("/healthz", (req, res) => res.json({ status: "ok" }));
app.get("/readyz", (req, res) => res.json({ status: "ready" }));
app.use("/tts", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Fallback TTS service running on port ${PORT}`, {
    provider: process.env.ACTIVE_TTS_PROVIDER || "gemini",
    env: process.env.NODE_ENV || "development",
  });
});

module.exports = app;