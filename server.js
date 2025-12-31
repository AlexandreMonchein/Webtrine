import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dirname, join } from "path";
import { getJson } from "serpapi";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.VITE_PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Route API pour récupérer les reviews Google
app.get("/api/reviews", async (req, res) => {
  try {
    const { dataId } = req.query;

    if (!dataId) {
      return res.status(400).json({ error: "dataId est requis" });
    }

    // Utiliser google_maps_reviews pour obtenir les avis
    const results = await getJson({
      engine: "google_maps_reviews",
      api_key: process.env.VITE_SERPAPI_KEY,
      data_id: dataId,
      hl: "fr",
    });

    return res.json(results);
  } catch (error) {
    console.error("Erreur SerpAPI:", error);
    return res
      .status(500)
      .json({ error: "Erreur lors de la récupération des reviews" });
  }
});

// Servir les fichiers statiques du build React
app.use(
  express.static(
    join(__dirname, "build", process.env.VITE_CUSTOMER || "showcase"),
  ),
);

// Route catch-all pour le React Router (doit être après toutes les routes API)
app.use((req, res) => {
  res.sendFile(
    join(
      __dirname,
      "build",
      process.env.VITE_CUSTOMER || "showcase",
      "index.html",
    ),
  );
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur le port ${PORT}`);
  console.log(`📍 API disponible sur http://localhost:${PORT}/api/reviews`);
});
