### Changes in Vite Config

```js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // const processEnvValues = {
  //   "process.env": Object.entries(env).reduce((prev, [key, val]) => {
  //     console.log(key, val);
  //     return {
  //       ...prev,
  //       [key]: val,
  //     };
  //   }, {}),
  // };

  return {
    plugins: [react()],
    // define: processEnvValues,
    server: {
      proxy: {
        "/api": {
          target: `http://localhost:${env.VITE_BACKEND_PORT}/api`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
```

1. From official [documentation](https://vitejs.dev/config/#using-environment-variables-in-config)
2. From stackoverflow [discussion](https://stackoverflow.com/questions/75265156/how-to-add-environment-variables-in-vite-config-js-for-a-react-project)
