const geminiProvider = require("../providers/gemini.provider");
const logger = require("../config/logger");

const ACTIVE_PROVIDER = "gemini";

exports.synthesize = async (text, language, options) => {
  try {
    switch (ACTIVE_PROVIDER) {
      case "gemini":
        return await geminiProvider.synthesize(text, language, options);

      default:
        throw new Error(`Unknown provider: ${ACTIVE_PROVIDER}`);
    }
  } catch (err) {
    logger.error("Provider Router Error", {
      provider: ACTIVE_PROVIDER,
      error: err.message
    });
    throw err;
  }
};