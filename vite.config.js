import react from "@vitejs/plugin-react";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "fs";
import path from "path";
import { defineConfig } from "vite";
import viteImagemin from "vite-plugin-imagemin";

// Plugin personnalisé pour copier seulement les assets du customer spécifié
function copyCustomerAssetsPlugin() {
  return {
    name: "copy-customer-assets",
    writeBundle(options) {
      const customer = process.env.VITE_CUSTOMER || "showcase";
      const outputDir = options.dir;
      const publicDir = path.resolve("public");

      // Fonction helper pour copier récursivement
      function copyRecursive(src, dest) {
        if (!existsSync(dest)) {
          mkdirSync(dest, { recursive: true });
        }

        const entries = readdirSync(src);
        for (const entry of entries) {
          const srcPath = path.join(src, entry);
          const destPath = path.join(dest, entry);

          if (statSync(srcPath).isDirectory()) {
            copyRecursive(srcPath, destPath);
          } else {
            copyFileSync(srcPath, destPath);
          }
        }
      }

      // 1. Copier robots.txt (fichier global)
      const robotsSrc = path.join(publicDir, "robots.txt");
      const robotsDest = path.join(outputDir, "robots.txt");
      if (existsSync(robotsSrc)) {
        copyFileSync(robotsSrc, robotsDest);
      }

      // 2. Copier les assets du customer spécifique
      const customerAssetsDir = path.join(publicDir, "assets", customer);
      const destCustomerAssetsDir = path.join(outputDir, "assets", customer);
      if (existsSync(customerAssetsDir)) {
        copyRecursive(customerAssetsDir, destCustomerAssetsDir);
      }

      // 3. Copier les assets globaux (fichiers à la racine de public/assets)
      const globalAssetsDir = path.join(publicDir, "assets");
      if (existsSync(globalAssetsDir)) {
        const entries = readdirSync(globalAssetsDir);
        for (const entry of entries) {
          const srcPath = path.join(globalAssetsDir, entry);
          // Ne copier que les fichiers (pas les dossiers de customers)
          if (statSync(srcPath).isFile()) {
            const destPath = path.join(outputDir, "assets", entry);
            // Créer le dossier de destination s'il n'existe pas
            const destDir = path.dirname(destPath);
            if (!existsSync(destDir)) {
              mkdirSync(destDir, { recursive: true });
            }
            copyFileSync(srcPath, destPath);
          }
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(), // React plugin for fast refresh, JSX support
    viteImagemin({
      mozjpeg: {
        quality: 75, // compresse les JPG
      },
      webp: {
        quality: 75, // génère les versions WebP compressées
      },
    }),
    copyCustomerAssetsPlugin(), // Notre plugin personnalisé
  ],
  resolve: {
    alias: {
      "@": path.resolve("src"), // Alias for src folder (for cleaner imports)
    },
  },
  build: {
    target: "esnext", // Use modern JS
    outDir: process.env.VITE_CUSTOMER
      ? `./build/${process.env.VITE_CUSTOMER}`
      : "./build/showcase", // Output directory for production build - showcase par défaut pour les tests
    assetsDir: "assets", // Folder for static assets like images
    minify: "esbuild", // Terser is the default minifier in Vite
    // Désactiver la copie automatique du dossier public
    copyPublicDir: false,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
      mangle: {
        toplevel: true, // Mangle top-level variables (may break things, use with caution)
      },
    },
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
