const express = require("express");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.post("/download", (req, res) => {
  const { url } = req.body;

  exec(`yt-dlp ${url} -o video.mp4`, (error) => {
    if (error) {
      return res.status(500).send("Erro ao baixar vídeo");
    }

    res.send("Vídeo baixado com sucesso");
  });
});

app.get("/", (req, res) => {
  res.send("Backend viral video rodando");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
