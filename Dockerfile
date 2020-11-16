FROM node:12

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3636

ENTRYPOINT ["node", "index.js"]