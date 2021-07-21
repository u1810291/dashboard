# Just for test build, megred from here:
# https://gitlab.mati.io/devops/dev-env/-/blob/master/dashboard/Dockerfile.dev-xx
# https://gitlab.mati.io/devops/dev-env/-/blob/master/dashboard/Dockerfile.dev-xx

FROM node:14-alpine

RUN apk update \
    && apk add --virtual build-dependencies \
        build-base \
        gcc \
        python
WORKDIR /app

RUN npm install -g npm

COPY package.json ./
COPY package-lock.json ./

ARG REACT_APP_API_URL=https://api.dev-xx.mati.io
ARG REACT_APP_SIGNUP_URL=https://popup.dev-xx.mati.io
ARG REACT_APP_MATI_BUTTON_URL=https://web-button.staging.getmati.com/button.js
ARG REACT_APP_STATIC_GOOGLE_MAP_API_KEY="AIzaSyBFeruTRfMBq0GZto9evUVaZ8b7uWBb6-Y"
ARG REACT_APP_INTERCOM_APP_ID=kkdmolx4
ARG REACT_APP_DASHBOARD_CLIENT_ID=60794e1245abe40021157879

RUN npm i \
    && npm list -g --depth=1 \
    && npm ll

RUN node -v
RUN npm -v

COPY tsconfig.json ./
COPY .eslintrc.json ./
COPY public ./public/
COPY src ./src/

RUN npm run build
