import { generateKeyPair } from "crypto";
import { writeFile } from "fs";

generateKeyPair(
  "rsa",
  {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "top secret",
    },
  },
  (err, publicKey, privateKey) => {
    if (err) throw err;

    writeFile("./keys/public.pem", { recursive: true }, publicKey, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log(`Public Key ${publicKey} has been recorded`);
      }
    });

    writeFile("./keys/private.pem", { recursive: true }, privateKey, (err) => {
      if (err) {
        throw new Error(err);
      } else {
        console.log(`Private Key ${privateKey} has been recorded`);
      }
    });
  }
);
