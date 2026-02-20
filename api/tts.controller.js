const validator = require("../core/validator");
const normalizer = require("../core/normalizer");
const providerRouter = require("../core/providerRouter");
const logger = require("../config/logger");

exports.handleTTSRequest = async (req, res, next) => {
  try {
    const { text, language, voice, format = "wav", speed = 1.0, pitch = 0 } = req.body;

    // 1. Validate Input
    const validationError = validator.validateTTSInput({ text, language, voice, format });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    // 2. Normalize Input Text
    const normalizedText = normalizer.normalizeText(text);

    // 3. Log request metadata
    logger.info("TTS request received", {
      language,
      voice,
      text_length: normalizedText.length,
      format,
      speed,
      pitch
    });

    // 4. Call Provider Router
    const audioResult = await providerRouter.synthesize(
      normalizedText,
      language,
      { voice, format, speed, pitch }
    );

    // 5. Return Audio Output
    return res.status(200).json({
      provider: audioResult.provider,
      audioBase64: audioResult.audioBase64,
      mimeType: audioResult.mimeType,
      format,
      voice
    });

  } catch (err) {
    logger.error("TTS processing failed", { error: err.message });
    next(err);
  }
};