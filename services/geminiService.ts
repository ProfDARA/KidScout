import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, FormState } from "../types";
import { QUESTIONS } from "../constants";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in the environment.");
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeChildProfile = async (data: FormState): Promise<AnalysisResult> => {
  const ai = getClient();

  // Format the questionnaire text
  let questionSummary = "Questionnaire Answers:\n";
  Object.entries(data.answers).forEach(([id, answer]) => {
    const q = QUESTIONS.find(q => q.id === Number(id));
    if (q) {
      questionSummary += `- Q: ${q.text}\n  A: ${answer}\n`;
    }
  });

  const prompt = `
    You are an expert child psychologist and graphologist. 
    Analyze the following child's profile based on their parent's answers to personality questions AND their handwriting sample.
    
    ${questionSummary}
    
    The image provided is a sample of the child's handwriting or drawing.
    Use Graphology principles: 
    - Large letters might indicate extroversion.
    - Small letters might indicate strong focus or introversion.
    - Heavy pressure might indicate high energy or tension.
    - Messy but fast might indicate quick thinking.
    
    Combine this with the questionnaire to create a comprehensive talent map.

    Return the result in strictly valid JSON format.
  `;

  // Define Schema
  const schema = {
    type: Type.OBJECT,
    properties: {
      mbti: { type: Type.STRING, description: "Estimated MBTI type (e.g., ENFP)" },
      childArchetype: { type: Type.STRING, description: "A creative title for the child (e.g., The Little Architect)" },
      summary: { type: Type.STRING, description: "A 2-3 sentence summary of their personality." },
      handwritingAnalysis: { type: Type.STRING, description: "Specific insights derived from the handwriting analysis (pressure, size, slant, etc)." },
      scores: {
        type: Type.ARRAY,
        description: "5-6 key attributes with scores 0-100 for a radar chart.",
        items: {
          type: Type.OBJECT,
          properties: {
            attribute: { type: Type.STRING, description: "e.g., Creativity, Logic, Empathy, Resilience, Social" },
            value: { type: Type.INTEGER, description: "Score from 0 to 100" }
          },
          required: ["attribute", "value"]
        }
      },
      suggestedCareers: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "List of 4 potential future career fields."
      },
      educationPath: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 specific suggestions for education style or extracurriculars."
      },
      parentingTips: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 specific actionable tips for parents to encourage talent."
      },
      parentingChallenges: {
        type: Type.ARRAY,
        description: "3 potential challenges the parent might face with this personality type and how to solve them.",
        items: {
          type: Type.OBJECT,
          properties: {
             challenge: { type: Type.STRING, description: "The potential issue (e.g., Stubbornness)" },
             solution: { type: Type.STRING, description: "How to deal with it (e.g., Offer choices)" }
          },
          required: ["challenge", "solution"]
        }
      }
    },
    required: ["mbti", "childArchetype", "summary", "handwritingAnalysis", "scores", "suggestedCareers", "educationPath", "parentingTips", "parentingChallenges"]
  };

  try {
    const parts: any[] = [{ text: prompt }];

    // Add image if it exists
    if (data.handwritingImage) {
      // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
      const base64Data = data.handwritingImage.split(',')[1];
      parts.push({
        inlineData: {
          mimeType: 'image/jpeg', // Assuming jpeg/png, standardizing
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    } else {
      throw new Error("Empty response from AI");
    }

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};