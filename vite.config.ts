import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/ihhor-card.ts"),
      name: "IhhorCard",
      fileName: "ihhor-card"
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: [],
      output: {
        format: "es",
        inlineDynamicImports: true,
        entryFileNames: "ihhor-card.js"
      }
    },
    sourcemap: true
  }
});
