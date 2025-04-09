import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Adjust path to point to public/assets from the scripts folder
const baseDir = path.join(__dirname, "../public/assets");

async function convertImagesInFolder(folder) {
  const files = await fs.promises.readdir(folder);

  for (const file of files) {
    const filePath = path.join(folder, file);
    const stat = await fs.promises.stat(filePath);

    if (stat.isDirectory()) {
      await convertImagesInFolder(filePath); // Recursively process subdirectories
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      // Check for both .jpg and .png
      const webpPath = filePath.replace(/\.(jpe?g|png)$/i, ".webp");
      try {
        // Convert image (JPG or PNG) to WebP
        await sharp(filePath).webp({ quality: 75 }).toFile(webpPath);

        // Optionally, delete the original file (JPG or PNG)
        await fs.promises.unlink(filePath);

        console.log(`✅ Converted and deleted: ${filePath} → ${webpPath}`);
      } catch (err) {
        console.error(`❌ Error converting or deleting ${filePath}:`, err);
      }
    }
  }
}

convertImagesInFolder(baseDir);
