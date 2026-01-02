
import { GoogleGenAI } from "@google/genai";
import { Repository } from "../types";

export async function analyzeDeveloper(username: string, repos: Repository[]): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const repoSummary = repos.map(r => 
    `- ${r.name} (${r.language || 'Unknown'}): ${r.description || 'No description'}`
  ).join('\n');

  const prompt = `
    Based on the following list of GitHub repositories for user "${username}", 
    provide a professional summary of their technical profile, primary skills, and potential expertise.
    Keep it concise (max 3 paragraphs).
    
    Repositories:
    ${repoSummary}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate insights at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI analysis is currently unavailable.";
  }
}
