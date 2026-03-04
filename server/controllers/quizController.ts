import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateQuiz = async (req: any, res: any) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const prompt = `Generate a high-quality academic quiz for a university student on the topic: "${topic}".
The questions should be challenging and follow the style of engineering exams at Mumbai University.

Follow these strict requirements:
1. Generate exactly 20 multiple-choice questions.
2. For each question, provide 4 distinct options.
3. Identify the correct answer (provided as a 0-based index: 0, 1, 2, or 3).
4. Provide a clear, educational explanation (2-3 sentences) for the correct answer.
5. Return the output ONLY as a valid JSON array of objects. Do not include any markdown formatting like \`\`\`json or backticks.

The JSON structure for each object must be:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": number,
  "explanation": "string"
}

Ensure all questions are unique and cover different sub-topics within ${topic}.`;

        const result = await genAI.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });

        let text = result.candidates?.[0]?.content?.parts?.[0]?.text || "";

        if (!text) {
            throw new Error("No response from AI");
        }

        // Clean text in case Gemini wraps it in markdown blocks
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const questions = JSON.parse(text);

        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("Invalid response format from AI");
        }

        // Add IDs to questions for the frontend
        const questionsWithIds = questions.slice(0, 20).map((q, idx) => ({
            ...q,
            id: idx + 1
        }));

        res.json({ questions: questionsWithIds });
    } catch (err: any) {
        console.error("Quiz Generation Error:", err);
        res.status(500).json({ error: "Failed to generate AI quiz. Please try again later." });
    }
};
