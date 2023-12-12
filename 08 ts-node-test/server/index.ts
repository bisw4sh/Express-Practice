import path from "node:path";
import fs from "node:fs/promises";

async function reader() {
  try {
    const fileBuf = await fs.readFile(
      path.join(process.cwd(), "test.txt"),
      "utf8"
    );
    console.log(fileBuf);
  } catch (error) {
    console.error(error);
  }
}

reader();

console.log("Lets put it in the github for future reference");
