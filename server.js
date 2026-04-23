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
app.get("/test", (req, res) => {

  const { exec } = require("child_process");

  exec("yt-dlp --version", (error, stdout, stderr) => {

    if (error) {
      return res.send("yt-dlp não instalado");
    }

    res.send("yt-dlp versão: " + stdout);

  });

});
