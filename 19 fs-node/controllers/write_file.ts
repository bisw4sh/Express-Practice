import { appendFile, writeFile } from "fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const write_file_a1 = async (data_to_write: string) => {
  const file_path = path.join(__dirname, "../files/writing_file.txt");
  try {
    const data = await appendFile(file_path, `${data_to_write}`, {
      flag: "w",
    });
    return `The file has been written`;
  } catch (error) {
    return error;
  }
};

export const write_file_a2 = async (data_to_write: string) => {
  const file_path = path.join(__dirname, "../files/writing_file.txt");
  try {
    const data = await writeFile(file_path, `${data_to_write}`);
    return `The file has been written`;
  } catch (error) {
    return error;
  }
};
