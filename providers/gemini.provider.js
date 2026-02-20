const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");
const logger = require("../config/logger");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function buildWavBuffer(pcmBuffer) {
  const numChannels = 1;
  const sampleRate = 24000;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const headerSize = 44;

  const wavBuffer = Buffer.alloc(headerSize + dataSize);

  wavBuffer.write("RIFF", 0);
  wavBuffer.writeUInt32LE(36 + dataSize, 4);
  wavBuffer.write("WAVE", 8);

  wavBuffer.write("fmt ", 12);
  wavBuffer.writeUInt32LE(16, 16);          
  wavBuffer.writeUInt16LE(1, 20);            
  wavBuffer.writeUInt16LE(numChannels, 22);
  wavBuffer.writeUInt32LE(sampleRate, 24);
  wavBuffer.writeUInt32LE(byteRate, 28);
  wavBuffer.writeUInt16LE(blockAlign, 32);
  wavBuffer.writeUInt16LE(bitsPerSample, 34);


  wavBuffer.write("data", 36);
  wavBuffer.writeUInt32LE(dataSize, 40);
  pcmBuffer.copy(wavBuffer, 44);

  return wavBuffer;
}

exports.synthesize = async (text, language, options = {}) => {
  try {
    const {
      voice = "Aoede",   
      style = "",        
    } = options;

    const prompt = style
      ? `${style}\n${text}`
      : text;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;

    if (!inlineData?.data) {
      throw new Error("Gemini TTS returned no audio.");
    }

    const pcmBuffer = Buffer.from(inlineData.data, "base64");
    const wavBuffer = buildWavBuffer(pcmBuffer);
    const audioBase64 = wavBuffer.toString("base64");

    logger.info("Gemini TTS succeeded", {
      language,
      voice,
      text_length: text.length,
      mimeType: "audio/wav",
    });

    return {
      provider: "gemini",
      audioBase64,          
      mimeType: "audio/wav",
    };

  } catch (err) {
    logger.error("Gemini TTS Error", {
      error: err.message,
      text_length: text?.length,
      language,
    });
    throw err;
  }
};