#!/usr/bin/env node

/**
 * Script de compression d'images pour optimiser les assets clients
 *
 * Usage:
 *   node scripts/compress-images.js <chemin-vers-dossier-ou-image>
 *
 * Exemples:
 *   node scripts/compress-images.js public/assets/apt235/
 *   node scripts/compress-images.js public/assets/apt235/IMG_45.webp
 *   pnpm compress:images public/assets/showcase/
 */

import { readdir, rename, stat, unlink } from "fs/promises";
import { dirname, extname, join, relative } from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Extensions supportées
const SUPPORTED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

// Configuration de compression
const COMPRESSION_CONFIG = {
  webp: {
    quality: 40, // Qualité WebP (75-80 optimal pour équilibre qualité/poids)
    effort: 6, // Effort de compression (0-6, plus élevé = meilleure compression)
    alphaQuality: 100, // Préserve la transparence si présente
  },
  jpeg: {
    quality: 75,
    mozjpeg: true, // Utilise mozjpeg pour meilleure compression
    progressive: true,
  },
  png: {
    quality: 80,
    compressionLevel: 9,
    effort: 10,
  },
};

/**
 * Vérifie si un fichier est une image supportée
 */
function isSupportedImage(filepath) {
  const ext = extname(filepath).toLowerCase();
  return SUPPORTED_EXTENSIONS.includes(ext);
}

/**
 * Obtient les statistiques d'un fichier
 */
async function getFileStats(filepath) {
  try {
    const stats = await stat(filepath);
    return stats;
  } catch (error) {
    console.error(
      `❌ Erreur lors de la lecture de ${filepath}:`,
      error.message,
    );
    return null;
  }
}

/**
 * Compresse une image
 */
async function compressImage(filepath) {
  const ext = extname(filepath).toLowerCase();
  const stats = await getFileStats(filepath);

  if (!stats) return;

  const originalSize = stats.size;
  const relativePath = relative(rootDir, filepath);

  try {
    console.log(
      `🔄 Traitement de ${relativePath} (${formatBytes(originalSize)})...`,
    );

    // Sharp supprime automatiquement les métadonnées par défaut
    // On garde juste l'orientation correcte
    let sharpInstance = sharp(filepath, { limitInputPixels: false });

    // Applique la compression selon le format
    switch (ext) {
      case ".webp":
        sharpInstance = sharpInstance.webp(COMPRESSION_CONFIG.webp);
        break;
      case ".jpg":
      case ".jpeg":
        sharpInstance = sharpInstance.jpeg(COMPRESSION_CONFIG.jpeg);
        break;
      case ".png":
        sharpInstance = sharpInstance.png(COMPRESSION_CONFIG.png);
        break;
      default:
        console.warn(`⚠️  Format non supporté: ${ext}`);
        return;
    }

    // Compresse et écrase le fichier original
    const tmpPath = `${filepath}.tmp`;
    await sharpInstance.toFile(tmpPath);

    // Vérifie la taille finale
    const tmpStats = await stat(tmpPath);
    const compressedSize = tmpStats.size;
    const reduction = ((originalSize - compressedSize) / originalSize) * 100;

    console.log(
      `   Taille compressée: ${formatBytes(compressedSize)} (${reduction >= 0 ? "-" : "+"}${Math.abs(reduction).toFixed(1)}%)`,
    );

    // Si la compression a réduit la taille, on remplace l'original
    if (compressedSize < originalSize) {
      await rename(tmpPath, filepath);
      console.log(
        `✅ ${relativePath}: ${formatBytes(originalSize)} → ${formatBytes(compressedSize)} (-${reduction.toFixed(1)}%)`,
      );
    } else {
      console.log(
        `⏭️  ${relativePath}: Pas d'amélioration (${formatBytes(originalSize)} → ${formatBytes(compressedSize)})`,
      );
      // Supprime le fichier temporaire si pas d'amélioration
      await unlink(tmpPath);
    }
  } catch (error) {
    console.error(
      `❌ Erreur lors de la compression de ${relativePath}:`,
      error.message,
    );

    // Nettoie le fichier temporaire en cas d'erreur
    try {
      await unlink(`${filepath}.tmp`);
    } catch {}
  }
}

/**
 * Traite un dossier récursivement
 */
async function processDirectory(dirPath) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    const promises = [];

    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Traite les sous-dossiers récursivement
        promises.push(processDirectory(fullPath));
      } else if (entry.isFile() && isSupportedImage(entry.name)) {
        // Compresse les images
        promises.push(compressImage(fullPath));
      }
    }

    await Promise.all(promises);
  } catch (error) {
    console.error(
      `❌ Erreur lors du traitement du dossier ${dirPath}:`,
      error.message,
    );
  }
}

/**
 * Formate les octets en taille lisible
 */
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

/**
 * Point d'entrée principal
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error(`
❌ Usage: node compress-images.js <chemin-vers-dossier-ou-image>

Exemples:
  node scripts/compress-images.js public/assets/apt235/
  node scripts/compress-images.js public/assets/apt235/IMG_45.webp
  pnpm compress:images public/assets/showcase/
    `);
    process.exit(1);
  }

  const targetPath = join(rootDir, args[0]);
  const targetStats = await getFileStats(targetPath);

  if (!targetStats) {
    console.error(`❌ Le chemin "${args[0]}" n'existe pas`);
    process.exit(1);
  }

  console.log("🗜️  Compression d'images en cours...\n");

  if (targetStats.isDirectory()) {
    await processDirectory(targetPath);
  } else if (targetStats.isFile() && isSupportedImage(targetPath)) {
    await compressImage(targetPath);
  } else {
    console.error(
      `❌ "${args[0]}" n'est pas un fichier image supporté ou un dossier`,
    );
    process.exit(1);
  }

  console.log("\n✨ Compression terminée !");
}

main();
