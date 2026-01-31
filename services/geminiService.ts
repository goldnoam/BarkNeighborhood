
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const searchDogLocations = async (query: string, lat?: number, lng?: number) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `מצא עבורי מקומות רלוונטיים עבור: ${query}. החזר תיאור קצר של המקומות הכי טובים בשכונה.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: lat && lng ? { latitude: lat, longitude: lng } : undefined
          }
        }
      },
    });

    const text = response.text || "לא נמצאו תוצאות.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return {
      text,
      locations: chunks.map((chunk: any) => ({
        title: chunk.maps?.title || "מקום לא ידוע",
        uri: chunk.maps?.uri || "#",
      }))
    };
  } catch (error) {
    console.error("Error searching locations:", error);
    throw error;
  }
};

export const dogExpertChat = async (message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `אתה עוזר וירטואלי מומחה לכלבים באפליקציית "נביחת השכונה". 
        ענה בעברית בצורה ידידותית, קצרה ומקצועית. 
        ספק טיפים על אילוף, תזונה, והמלצות על מקומות בשכונה.`,
      },
    });
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Chat error:", error);
    return "מצטער, אני לא מצליח לענות כרגע. נסה שוב מאוחר יותר!";
  }
};
