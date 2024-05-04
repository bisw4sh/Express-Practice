import { rename, writeFile } from "fs/promises";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//! TODO: rename that doesn't exist
//! Check if it need the file

export const rename_file_a1 = async (rename_to: string) => {
  const file_from = path.join(__dirname, `../files/rename_this.txt`);
  const file_to = path.join(__dirname, `../files/${rename_to}`);

  try {
    await writeFile(file_from, "");
    await rename(file_from, file_to);
    return `Renamed from ${file_from} to ${file_to}`;
  } catch (error) {
    return error;
  }
};

//Throws an error as it doesn't exist
export const rename_file_a2 = async (rename_to: string) => {
  const file_to = path.join(__dirname, `../files/${rename_to}`);

  try {
    await rename(path.join(__dirname, `../files/rename_this.txt`), file_to);
    return `The file has been written`;
  } catch (error) {
    return error;
  }
};
