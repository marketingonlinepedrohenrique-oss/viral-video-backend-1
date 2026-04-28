FROM node:18

WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-pip ffmpeg

RUN pip3 install yt-dlp --break-system-packages

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm","start"]
