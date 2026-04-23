import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const APIFY_TOKEN = process.env.APIFY_TOKEN;

app.post("/gerar", async (req, res) => {
  try {

    const { prompt } = req.body;

    const response = await axios.post(
      `https://api.apify.com/v2/acts/apify~openai/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
      {
        prompt: prompt
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao gerar resposta" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
const axios = require("axios")

app.get("/viral", async (req,res)=>{

 try{

  const response = await axios.post(
   "https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items",
   {
    search: "viral",
    maxVideos: 10
   },
   {
    params: {
     token: process.env.APIFY_TOKEN
    }
   }
  )

  res.json(response.data)

 }catch(error){
  res.send("Erro ao buscar vídeos virais")
 }

})
