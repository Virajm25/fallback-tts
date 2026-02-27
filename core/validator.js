const SUPPORTED_LANGUAGES = [
  "hi-IN", "en-IN", "mr-IN", "bn-IN", "gu-IN", "ta-IN",
  "te-IN", "kn-IN", "ml-IN", "pa-IN", "or-IN", "as-IN",
  "kok-IN", "mai-IN", "ur-IN"
];

const SUPPORTED_FORMATS = ["wav"];

exports.validateTTSInput = ({ text, language, voice, format }) => {
  if (!text || typeof text !== "string") {
    return "Text field is required and must be a string.";
  }

  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return "Text cannot be empty.";
  }

  if (trimmed.length > 5000) {
    return "Text exceeds the maximum limit of 5000 characters.";
  }

  if (!language) {
    return "Language code is required.";
  }

  if (!SUPPORTED_LANGUAGES.includes(language)) {
    return `Unsupported language: "${language}". Supported: ${SUPPORTED_LANGUAGES.join(", ")}`;
  }

  if (format && !SUPPORTED_FORMATS.includes(format)) {
    return `Unsupported audio format: "${format}". Supported formats: ${SUPPORTED_FORMATS.join(", ")}`;
  }

  if (voice && typeof voice !== "string") {
    return "Voice must be a string if provided.";
  }

  return null; 
};