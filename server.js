const express = require("express")
const axios = require("axios")
const { exec } = require("child_process")

const app = express()

const APIFY_TOKEN = process.env.APIFY_TOKEN

app.get("/", (req,res)=>{
 res.send("Servidor viral funcionando")
})

app.get("/download",(req,res)=>{

 const url = req.query.url

 if(!url){
  return res.send("Envie uma URL")
 }

 exec(`yt-dlp -f best -o video.mp4 ${url}`, (error, stdout, stderr)=>{

  if(error){
   console.log(error)
   return res.send("Erro ao baixar vídeo")
  }

  res.download("video.mp4")

 })

})
app.get("/viral", async (req,res)=>{

 try{

 const query = req.query.q || "viral"

 const response = await axios.post(
  `https://api.apify.com/v2/acts/clockworks~tiktok-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
  {
   searchQueries: [query],
   maxItems: 20
  }
 )

 res.json(response.data)

 }catch(error){

 console.log("Erro Apify:", error.response?.data || error.message)

 res.send("Erro ao buscar vídeos virais")

 }

})

app.listen(3000, ()=>{
 console.log("Servidor rodando")
})
