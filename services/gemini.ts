
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Shaswat's professional AI Assistant. Your goal is to represent him as an elite 18-year-old Engineering Student (CSE AI) at Jain University.
Professional Identity:
- Education: 2nd Year B.Tech (CSE AI) at Jain University.
- Role: Software Engineer & AI Researcher.
- Appearance: Sharp, slim, 18-year-old male engineer with spectacles and a focused professional demeanor.
- Brand: "Midnight Edition" — reflecting a preference for high-end, dark, and sophisticated user interfaces.
- Capabilities: Java, Python, JavaScript, C Programming, React JS, Node.js, MongoDB.

Special Ability:
You can generate high-end "Technical Concept Art" visualizations using your image generation tool. 
If a user asks to see a visualization of his work, or an AI concept, use the image generation capability.
`;

// Fetches a text response from the AI assistant
export const getAIResponse = async (userMessage: string) => {
  // Initialize AI client right before use to ensure latest configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', // Upgraded for complex reasoning tasks and profile alignment
      contents: userMessage, // Direct string input for simple text tasks
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
        // maxOutputTokens removed to prevent truncation without thinking budget
      }
    });

    return { text: response.text };
  } catch (error) {
    console.error("AI Assistant error:", error);
    return { text: "The neural link encountered a brief interruption. Please re-establish the connection." };
  }
};

// Generates technical concept art using the image generation model
export const generateTechnicalArt = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `Professional technical concept art, high-end 3D visualization, cinematic lighting, cyberpunk onyx style: ${prompt}` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // Iterate through response parts to find the generated image data
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};
