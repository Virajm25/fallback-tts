const express = require("express");
const router = express.Router();
const ttsController = require("./tts.controller");

// POST /tts
router.post("/", ttsController.handleTTSRequest);

module.exports = router;