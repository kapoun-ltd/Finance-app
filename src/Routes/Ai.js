import express from "express";
import cors from "cors";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/analyze-spending", async (req, res) => {
    try {
        const { transactions } = req.body;

        // Ensure transactions were actually sent
        if (!transactions) {
            return res.status(400).json({ error: "No transactions provided" });
        }

        const prompt = `
        Analyze these expenses and give short financial advice:

        ${JSON.stringify(transactions)}
        `;

        // FIXED: Changed "gpt-4.1-mini" to the correct model "gpt-4o-mini"
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini", 
            messages: [
                {
                    role: "system",
                    content: "You are a smart finance assistant."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        });

        res.json({
            insight: response.choices[0].message.content
        });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({
            error: "AI analysis failed"
        });
    }
});

export default router;