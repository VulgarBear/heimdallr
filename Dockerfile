FROM node:lts-bookworm

RUN mkdir /bot
WORKDIR /bot
COPY . /bot

RUN npm install

CMD ["npm", "start"]