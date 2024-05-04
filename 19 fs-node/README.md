```js
//Use of Relative File Import
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

filePath = path.join(__dirname, "public", "index.html");
```

```js
console.log(import.meta.url);
console.log(__filename);
console.log(__dirname);
```

```sh
file:///C:/Users/spike/Desktop/Fs-node/controllers/read_file.ts
C:\Users\spike\Desktop\Fs-node\controllers\read_file.ts
C:\Users\spike\Desktop\Fs-node\controllers
```

---

```js
//Used to get relative path of script being executed
const currentPath = process.cwd();
```

_Give the current path where the script is being executed_

---

### 1. Read Files

```js
import { readFile } from "fs/promises";

const data = await readFile(path.join(__dirname, "./file_name.ext"));
const dataString = data.toString();
```

### 2. Write Files

```js
import { writeFile } from "fs/promises";
await writeFile(path.join(__dirname, "./file_name.ext"));
```

### 3. Append Files

That **_{ flag : "w"}_** turns the function to write mode, which overrides the contents of file, devoid of it just adds the content ontop of it.

```js
import { appendFile } from "fs/promises";
await readFile(path.join(__dirname, "./file_name.ext"), { flag: "w" });
```

### 4. Rename Files

```js
import { rename } from "fs/promises";
await rename(file_from, file_to);
//file_from, file_to are as name suggests, but it has to be whole file handle path
```

### 5. Delete Files

```js
import { unlink } from "fs/promises";
await unlink(to_delete);
//throws error if file doesn't exist
```
