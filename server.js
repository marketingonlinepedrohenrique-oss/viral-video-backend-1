const express = require("express")
const { exec } = require("child_process")

const app = express()

app.get("/", (req,res)=>{
 res.send("Vídeo viral backend rodando")
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

app.listen(3000, ()=>{
 console.log("Servidor rodando")
})
