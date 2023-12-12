1. Initialize the node project
```bash
pnpm init
```

2. Install typescript
```bash
pnpm add -D typescript @types/node

```

3. Generate the tsconfig.json file
```bash
pnpm tsc -–init || pnpm exec tsc –init
```

**Check tsconfig to change the attributes**

4. To convert .ts -> .js file
```bash
pnpm tsc <index.ts> 
```

Uncomment allowJs, outDir, rootDir in tsconfig.json to get the following command working.

—> converts all .ts to .js
 
```bash 
pnpm tsc
```

```json
"scripts": {
   "start": "tsc && node dist/server/index.js"
}
```


Following is done so that tsx generates the file & index.js is run with pnpm dev

```bash 
pnpm add -D tsx
```

 ```json
 "scripts": {
     "dev": "pnpm exec tsx server/index.ts",
}
 ```

WITH tsx
pnpm add -D tsx

pnpm dev


WITH tsc-watch
Pnpm add -D tsc-watch


resource to follow

https://www.youtube.com/watch?v=HvxYkugp55A&list=PLFC7Ll1XFft7fPJiR76EZcBqSZd70xtIl&index=26

https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension

https://stackoverflow.com/questions/63742790/unable-to-import-esm-ts-module-in-node/74608156#74608156

https://github.com/felipeplets/esm-examples

https://www.npmjs.com/package/tsc-watch

https://www.npmjs.com/package/tsx

