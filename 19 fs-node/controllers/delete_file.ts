import { unlink } from "fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const delete_file = async (file_name: string) => {
  try {
    const to_delete = path.join(__dirname, `../files/${file_name}`);
    await unlink(to_delete);
    return `${file_name} has been deleted`;
  } catch (error) {
    return error;
  }
};
