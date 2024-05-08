import url from "node:url";
import path from "node:path";
import { writeFile, appendFile } from "fs/promises";

const __file = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const write_tokens = async (data: string) => {
  await writeFile(path.join(__dirname, "../Tokens.md"), data, "utf-8");
};

export const append_tokens = async (data: string) => {
  await appendFile(path.join(__dirname, "../Tokens.md"), data, "utf-8");
};
