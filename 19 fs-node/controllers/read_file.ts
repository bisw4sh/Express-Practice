import { readFile } from "fs/promises";
import path from "node:path";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const read_file = async () => {
  try {
    const data = await readFile(
      path.join(__dirname, "../files/reading_file.txt")
    );
    const dataString = data.toString();
    return dataString;
  } catch (error) {
    return error;
  }
};
