import { readFile } from "fs/promises";

export const url_read = async () => {
  try {
    const filePath = new URL("./package.json", import.meta.url);
    console.log("filepath ", filePath);
    const contents = await readFile(filePath, { encoding: "utf8" });
    console.log("contents ", contents);
    return contents;
  } catch (error) {
    return error;
  }
};
