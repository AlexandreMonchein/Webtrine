#!/usr/bin/env node

/**
 * Script précis pour détecter les images inutilisées (tous clients sauf showcase)
 */

const fs = require("fs");
const path = require("path");

const CUSTOMERS = ["chillpaws", "dipaolo", "webtrine", "apt235"];
const KEEP_FILES = [
  "apple-touch-icon.png",
  "favicon-16x16.png",
  "favicon-32x32.png",
  "favicon.ico",
];

function analyzeCustomer(customer) {
  console.log(`\n${"=".repeat(80)}`);
  console.log(`CLIENT: ${customer.toUpperCase()}`);
  console.log("=".repeat(80));

  const assetsDir = path.join(__dirname, "..", "public", "assets", customer);
  const configDir = path.join(__dirname, "..", "config", "customer", customer);

  if (!fs.existsSync(assetsDir)) {
    console.log("⚠️  Répertoire assets introuvable");
    return { customer, unused: [], used: 0 };
  }

  // 1. Lire toutes les images
  const allImages = fs
    .readdirSync(assetsDir)
    .filter((f) => f.match(/\.(webp|jpg|jpeg|png|svg|gif)$/i))
    .filter((f) => !KEEP_FILES.includes(f))
    .sort();

  // Inclure aussi les sous-dossiers
  const subDirs = ["icons", "clients", "themeMode"];
  subDirs.forEach((subDir) => {
    const subDirPath = path.join(assetsDir, subDir);
    if (fs.existsSync(subDirPath)) {
      const subImages = fs
        .readdirSync(subDirPath)
        .filter((f) => f.match(/\.(webp|jpg|jpeg|png|svg|gif)$/i))
        .filter((f) => !KEEP_FILES.includes(f))
        .map((f) => path.join(subDir, f));
      allImages.push(...subImages);
    }
  });

  console.log(`📁 Total images: ${allImages.length}`);

  // 2. Lire tout le contenu des configs
  let configContent = "";
  if (fs.existsSync(configDir)) {
    const configFiles = fs
      .readdirSync(configDir)
      .filter((f) => f.endsWith(".json"));

    configFiles.forEach((configFile) => {
      const configPath = path.join(configDir, configFile);
      configContent += `${fs.readFileSync(configPath, "utf8")}\n`;
    });
  }

  // 3. Vérifier chaque image individuellement
  const unusedImages = [];
  let usedCount = 0;

  allImages.forEach((image) => {
    const fileName = path.basename(image);
    const baseName = fileName.replace(/\.(webp|jpg|jpeg|png|svg|gif)$/i, "");

    // Vérification stricte de présence dans les configs
    const isUsed =
      configContent.includes(`"${fileName}"`) ||
      configContent.includes(`"${baseName}"`) ||
      configContent.includes(`/${fileName}`) ||
      configContent.includes(`/${baseName}`) ||
      configContent.includes(`${customer}/${image}`) ||
      configContent.includes(`${customer}/${fileName}`) ||
      // Vérifier aussi les chemins avec icons/
      (image.includes("/") &&
        (configContent.includes(`/${image}`) ||
          configContent.includes(`"${image}"`)));

    if (isUsed) {
      usedCount++;
    } else {
      unusedImages.push(image);
    }
  });

  console.log(`✅ Images utilisées: ${usedCount}`);
  console.log(`🗑️  Images inutilisées: ${unusedImages.length}`);

  if (unusedImages.length > 0) {
    console.log("\nDétail des images inutilisées:");
    let totalSize = 0;

    unusedImages.forEach((img) => {
      const imgPath = path.join(assetsDir, img);
      const stats = fs.statSync(imgPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalSize += stats.size;
      console.log(`  ❌ ${img} (${sizeKB} KB)`);
    });

    console.log(`\n💾 Total: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  }

  return { customer, unused: unusedImages, used: usedCount };
}

// Main
console.log("\n🔍 ANALYSE DES IMAGES INUTILISÉES");
console.log("=".repeat(80));

const results = CUSTOMERS.map(analyzeCustomer);

console.log(`\n${"=".repeat(80)}`);
console.log("📊 RÉSUMÉ GLOBAL");
console.log("=".repeat(80));

const totalUnused = results.reduce((sum, r) => sum + r.unused.length, 0);
const totalUsed = results.reduce((sum, r) => sum + r.used, 0);

results.forEach((r) => {
  if (r.unused.length > 0) {
    console.log(`  ${r.customer}: ${r.unused.length} images à supprimer`);
  } else {
    console.log(`  ${r.customer}: ✅ Tous les assets sont utilisés`);
  }
});

console.log(`\n${"=".repeat(80)}`);
console.log(`Total inutilisé: ${totalUnused} fichiers`);
console.log(`Total utilisé: ${totalUsed} fichiers`);
console.log("=".repeat(80));

// Retourner les résultats pour utilisation ultérieure
process.exit(totalUnused > 0 ? 1 : 0);
