
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly when initializing the client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getVulnerabilityExplanation = async (vulnerabilityName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `بصفتك خبيراً في الأمن السيبراني، اشرح ثغرة "${vulnerabilityName}" من قائمة OWASP Top 10 بشكل مبسط لمبتدئ باللغة العربية. اذكر مثالاً بسيطاً وكيفية الحماية منها.`,
    });
    // Access the text property directly on the response object.
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، حدث خطأ أثناء جلب المعلومات. يرجى المحاولة لاحقاً.";
  }
};
