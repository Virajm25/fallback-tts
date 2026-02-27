const geminiProvider = require("../providers/gemini.provider");
const logger = require("../config/logger");

const ACTIVE_PROVIDER = process.env.ACTIVE_TTS_PROVIDER || "gemini";

exports.synthesize = async (text, language, options) => {
  try {
    switch (ACTIVE_PROVIDER) {
      case "gemini":
        return await geminiProvider.synthesize(text, language, options);

      default:
        throw new Error(`Unknown TTS provider: "${ACTIVE_PROVIDER}". Check ACTIVE_TTS_PROVIDER in .env`);
    }
  } catch (err) {
    logger.error("Provider Router Error", {
      provider: ACTIVE_PROVIDER,
      error: err.message,
    });
    throw err;
  }
};