FROM node:8-alpine

RUN apk add git

WORKDIR /app
COPY ./yarn.lock ./package.json ./

RUN yarn

COPY . .

RUN yarn build:dev01
