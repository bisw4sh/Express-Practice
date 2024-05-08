import path from "node:path";
import url from "node:url";
import { readFile } from "fs/promises";

//Path to this file
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Path of Keys
const public_key_path = path.join(__dirname, "../keys/public.pem");
const private_key_path = path.join(__dirname, "../keys/private.pem");

export const get_public_key = async () => {
  try {
    const public_key = await readFile(public_key_path, "utf-8");
    return public_key;
  } catch (error) {
    return error;
  }
};


export const get_private_key = async () => {
  try {
    const private_key = await readFile(private_key_path, "utf-8");
    return private_key;
  } catch (error) {
    return error;
  }
};
