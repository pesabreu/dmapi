FROM node:12

WORKDIR /app

COPY . .

ENV PORT=3636

RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "index.js"]