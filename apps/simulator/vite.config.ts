import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { fileApiPlugin } from "./server/fileApi";

export default defineConfig({
  plugins: [react(), fileApiPlugin()],
  server: { port: 3001, strictPort: true, open: true },
});
