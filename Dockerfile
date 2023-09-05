FROM node:lts-bookworm-slim

RUN mkdir /bot
WORKDIR /bot
COPY . /bot

RUN yarn install && yarn cache clean

CMD ["yarn", "start"]