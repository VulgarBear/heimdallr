FROM node:alpine

WORKDIR /usr/heimdallr
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm run start"]