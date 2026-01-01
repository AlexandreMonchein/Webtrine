import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { dirname } from "path";
import { getJson } from "serpapi";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
      api_key:
        "8a37493c357fc96c542460ecedbee27211b005c84ea482e138caedff6980c995",
      data_id: dataId,
      hl: "fr",
    });

    return res.json(results);
  } catch (err) {
    console.error("Erreur SerpAPI:", err);
    return res
      .status(500)
      .json({ error: `Erreur lors de la récupération des reviews: ${err}` });
  }
});

app.use(express.static(path.join(__dirname, "html")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "html/index.html"));
});

app.listen(port, () => {
  console.log(`✅ Serveur démarré sur le port ${port}`);
  console.log(`📍 API disponible sur http://localhost:${port}/api/reviews`);
});
