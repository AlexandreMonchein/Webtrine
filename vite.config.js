import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(), // React plugin for fast refresh, JSX support
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias for src folder (for cleaner imports)
    },
  },
  build: {
    target: "esnext", // Use modern JS
    outDir: process.env.VITE_CUSTOMER
      ? `./build/${process.env.VITE_CUSTOMER}`
      : "build", // Output directory for production build
    assetsDir: "assets", // Folder for static assets like images
  },
  server: {
    port: 3000, // Dev server port
    open: true, // Open browser automatically
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly", // Optional: CSS modules config
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"], // Pre-bundle React for faster startup
  },
  define: {
    "process.env": process.env, // Mimic process.env like in Webpack (important for environment variables)
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Auto-inject React for JSX (since React 17+ has no need to import `React` explicitly)
  },
});
