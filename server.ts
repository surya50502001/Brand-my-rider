import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/generate-motto", async (req, res) => {
    try {
      const { name, description, tone } = req.body;
      if (!name) {
        return res.status(400).json({ error: "Company or creator name is required." });
      }

      // Safeguard against missing API key
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({ 
          motto: `Sovereign builders of ${name}.` // Fallback if user hasn't configured a key yet
        });
      }

      // Initialize GoogleGenAI SDK server-side with standard aistudio telemetry
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `You are a high-end classical stone-cutter and developer monument architect. Your job is to draft a single, extremely powerful, elegant 1-line brand motto, slogan, or sovereign developer proverb for a sponsor company or creator named "${name}" (described as: "${description || 'A software creator, library, or startup'}").
      The tone requested is: ${tone || 'Classic Monumental'}.
      
      CRITICAL INSTRUCTIONS:
      - The motto MUST be under 110 characters.
      - Return ONLY the motto string itself. Do not wrap it in quotes, do not explain it, do not add introductory phrases. Just return the raw text.
      - Make it sound deeply premium, timeless, and inspiring. E.g. "Deploy at the speed of light, scaled infinitely" or "The open-source ledger for digital sovereigns." or "Where the world sculpts code together."`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
      });

      const motto = response.text?.trim()?.replace(/^"(.*)"$/, '$1') || "";
      res.json({ motto });
    } catch (err: any) {
      console.error("Gemini motto generation error:", err);
      res.status(500).json({ error: err.message || "Failed to generate motto using AI." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
