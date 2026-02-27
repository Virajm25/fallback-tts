exports.normalizeText = (text) => {
  if (!text) return "";

  let cleaned = text;

  cleaned = cleaned.trim();
  cleaned = cleaned.replace(/[\u200B-\u200D\uFEFF]/g, "");
  cleaned = cleaned.replace(/\s+/g, " ");
  cleaned = cleaned.replace(/[""]/g, '"');
  cleaned = cleaned.replace(/['']/g, "'");
  cleaned = cleaned.replace(/[–—]/g, "-");
  cleaned = cleaned.replace(/…/g, "...");
  cleaned = cleaned.replace(/\s*•\s*/g, " ");
  cleaned = cleaned.replace(/[\p{Emoji}\p{Extended_Pictographic}]/gu, "");
  const indicNumbers = "०१२३४५६७८९";
  const westernNumbers = "0123456789";
  indicNumbers.split("").forEach((ind, idx) => {
    cleaned = cleaned.replace(new RegExp(ind, "g"), westernNumbers[idx]);
  });
  cleaned = cleaned.replace(/(https?:\/\/[^\s]+)/g, " URL ");
  cleaned = cleaned.replace(/([!?.,])\1+/g, "$1");
  cleaned = cleaned.replace(/\s*-\s*/g, "-");
  
  return cleaned.trim();
};