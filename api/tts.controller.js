const validator = require("../core/validator");
const normalizer = require("../core/normalizer");
const providerRouter = require("../core/providerRouter");
const logger = require("../config/logger");

exports.handleTTSRequest = async (req, res, next) => {
  try {
    const { text, language, voice, format = "wav" } = req.body;
    const validationError = validator.validateTTSInput({ text, language, voice, format });
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const normalizedText = normalizer.normalizeText(text);

    logger.info("TTS request received", {
      language,
      voice,
      text_length: normalizedText.length,
      format,
    });

    const audioResult = await providerRouter.synthesize(
      normalizedText,
      language,
      { voice, format }
    );

    return res.status(200).json({
      provider: audioResult.provider,
      audioBase64: audioResult.audioBase64,
      mimeType: audioResult.mimeType,
      format,
      voice,
    });

  } catch (err) {
    logger.error("TTS processing failed", { error: err.message });
    next(err);
  }
};