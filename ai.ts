
import { GoogleGenAI, Type } from "@google/genai";

const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLiveAds() {
  const ai = getAi();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: 'Generate 10 realistic global crypto advertisement titles and short descriptions for a PTC site. Focus on Bitcoin, USDT, Mining, and Trading.',
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            reward: { type: Type.NUMBER },
          },
          required: ["title", "description", "reward"]
        }
      }
    }
  });
  
  try {
    return JSON.parse(response.text);
  } catch (e) {
    return [];
  }
}

export async function getEarningStrategy(balance: number, referrals: number) {
  const ai = getAi();
  const prompt = `A user has ${balance} USDT and ${referrals} referrals on a crypto faucet site called GlobalAdsFaucet. Provide 3 short, professional, and motivating tips to increase their earnings today.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  
  return response.text;
}
