const express = require("express");
const axios = require("axios");
const { execFile } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const APIFY_TOKEN = process.env.APIFY_TOKEN;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/download", (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("Envie uma URL");
  }

  execFile("yt-dlp", ["-f", "best", "-o", "video.mp4", url], (error) => {
    if (error) {
      console.log(error);
      return res.status(500).send("Erro ao baixar vídeo");
    }

    res.download("video.mp4");
  });
});

app.get("/viral", async (req, res) => {
  if (!APIFY_TOKEN) {
    return res.status(500).send("APIFY_TOKEN não configurado");
  }

  try {
    const query = req.query.q || "viral";

    const response = await axios.post(
      `https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
      {
        searchQueries: [query],
        maxItems: 20
      }
    );

    res.json(response.data);
  } catch (error) {
    console.log("Erro Apify:", error.response?.data || error.message);
    res.status(500).send("Erro ao buscar vídeos virais");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
