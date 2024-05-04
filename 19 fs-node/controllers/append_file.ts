import { appendFile } from "fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const append_file = async (data_to_append: string) => {
  const file_path = path.join(__dirname, "../files/appending_file.txt");
  try {
    const data = await appendFile(file_path, `\n${data_to_append}`, {
      //   flag: "w", this removes all there is and adds the data
    });
    return `${data_to_append} has been appended to the file`;
  } catch (error) {
    return error;
  }
};
