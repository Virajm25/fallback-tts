require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("./middleware/rateLimit");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./api/tts.routes");
const logger = require("./config/logger");

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(rateLimit);

// ---------- Routes ----------
app.use("/tts", routes);

// ---------- Health Check ----------
app.get("/healthz", (req, res) => res.json({ status: "ok" }));
app.get("/readyz", (req, res) => res.json({ status: "ready" }));

// ---------- Error Handler ----------
app.use(errorHandler);

// ---------- Start Server ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Fallback TTS service running on port ${PORT}`);
});

module.exports = app;