import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "node:fs/promises";
import path from "node:path";
import { __dirname } from "../getPath";

if (!process.env.GEMINI_API_KEY) throw new Error("No Gemini API key");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function run(fileName: string) {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "files", fileName + ".md"),
      "utf-8"
    );

    const result = await model.generateContent(`${data}
        \n\n
        Generate multiple choice questions with options and correct answers based on the provided text. 
        Return the result as a JSON array of objects, where each object has the following structure:
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_answer": "The correct option"
    }`);

    const response = result.response;
    const response_string =
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response_string) {
      throw new Error("Response string is undefined.");
    }

    const match = response_string.match(/```json([\s\S]*?)```/);

    if (!match) {
      throw new Error("Invalid Gemini response format.");
    }

    const parsed_data = match[1].trim();
    const parsed_mcqs = JSON.parse(parsed_data);

    return parsed_mcqs;
  } catch (error) {
    console.error("Error occurred:", error);
    return { message: "An error occurred while processing the request." };
  }
}
