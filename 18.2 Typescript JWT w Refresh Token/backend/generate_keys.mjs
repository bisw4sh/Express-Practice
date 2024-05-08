import { generateKeyPair } from "crypto";
import { writeFile } from "fs/promises";
import "dotenv/config";

(async () => {
  try {
    const { publicKey, privateKey } = await new Promise((resolve, reject) => {
      generateKeyPair(
        "rsa",
        {
          modulusLength: 2048,
          publicKeyEncoding: {
            type: "spki",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
          },
        },
        (err, publicKey, privateKey) => {
          if (err) {
            reject(err);
          } else {
            resolve({ publicKey, privateKey });
          }
        }
      );
    });

    await writeFile("./keys/public.pem", publicKey);
    await writeFile("./keys/private.pem", privateKey);
    console.log("Keys generated and saved successfully!");
  } catch (err) {
    console.error(err);
  }
})();
