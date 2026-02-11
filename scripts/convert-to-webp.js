/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Adjust path to point to public/assets from the scripts folder
const baseDir = path.join(__dirname, "../public/assets");

async function convertImagesInFolder(folder) {
  const files = await fs.promises.readdir(folder);

  const promises = files.map(async (file) => {
    const filePath = path.join(folder, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
      return convertImagesInFolder(filePath); // Recursively process subdirectories
    } else if (/\.(jpe?g|png|avif)$/i.test(file)) {
      // Check for both .jpg and .png
      const webpPath = filePath.replace(/\.(jpe?g|png|avif)$/i, ".webp");
      try {
        // Convert image (JPG or PNG) to WebP
        await sharp(filePath).webp({ quality: 75 }).toFile(webpPath);

        // Optionally, delete the original file (JPG or PNG)
        await fs.promises.unlink(filePath);

        console.log(`✅ Converted and deleted: ${filePath} → ${webpPath}`);
        return { success: true, file: filePath };
      } catch (err) {
        console.error(`❌ Error converting or deleting ${filePath}:`, err);
        return { success: false, file: filePath, error: err };
      }
    }
    return { success: true, file: filePath, skipped: true };
  });

  await Promise.all(promises);
}

convertImagesInFolder(baseDir);
