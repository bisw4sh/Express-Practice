import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs/promises";
import path from "node:path";
import { __dirname } from "../getPath";

if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini API key");
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function run(fileName: string) {
  const data = await fs.readFile(
    path.join(__dirname, "files", fileName + ".md"),
    "utf-8"
  );

  const result = await model.generateContent(
    data +
      "\n Generate multiple choice questions with options, correct answer in json from this data"
  );
  const response = result.response;
  return response;
}
