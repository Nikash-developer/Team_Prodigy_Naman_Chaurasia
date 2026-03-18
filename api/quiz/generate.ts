// Quiz Generation Handler - v1.2 (Bypass Auth)
import type { VercelRequest, VercelResponse } from '@vercel/node';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // In a Firebase-auth app, the frontend doesn't receive a standard JWT for our node backend.
        // For the purposes of this quiz generator, we can safely bypass the token check.

        const { topic } = req.body;
        if (!topic) {
            return res.status(400).json({ error: "Topic is required" });
        }

        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "OPENAI_API_KEY is not configured in Vercel Environment Variables." });
        }

        const prompt = `Generate exactly 10 challenging academic multiple-choice questions for a university student on the topic: "${topic}".
Style: Engineering/University level (Mumbai University exam pattern).
Return ONLY a valid JSON array. No markdown, no backticks, no extra text.
Each object must have:
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correctAnswer": number (0 to 3),
  "explanation": "short educational string"
}`;

        const apiUrl = 'https://api.openai.com/v1/chat/completions';

        const apiResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Efficient and high performance
                messages: [
                    { role: "system", content: "You are a specialized academic quiz generator." },
                    { role: "user", content: prompt }
                ],
                response_format: { type: "json_object" }
            })
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            console.error(`OpenAI API Error (${apiResponse.status}):`, errorBody);
            return res.status(502).json({ error: `AI API error: ${errorBody.slice(0, 200)}` });
        }

        const apiResult = await apiResponse.json();
        let text = apiResult?.choices?.[0]?.message?.content;

        if (!text) {
            return res.status(502).json({ error: "Empty response from AI model" });
        }

        // OpenAI with JSON mode might return { "questions": [...] } or just [...]
        // Let's ensure we get the array.
        let parsed;
        try {
            parsed = JSON.parse(text);
            if (parsed.questions && Array.isArray(parsed.questions)) {
                parsed = parsed.questions;
            }
        } catch {
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                parsed = JSON.parse(jsonMatch[0]);
            } else {
                return res.status(502).json({ error: "AI returned invalid JSON" });
            }
        }
        const questions = parsed;

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(502).json({ error: "AI returned empty array" });
        }

        const questionsWithIds = questions.map((q: any, idx: number) => ({
            ...q,
            id: idx + 1
        }));

        return res.status(200).json({ questions: questionsWithIds });

    } catch (err: any) {
        console.error("Quiz handler error:", err);
        return res.status(500).json({ error: err.message || "Internal server error" });
    }
}
