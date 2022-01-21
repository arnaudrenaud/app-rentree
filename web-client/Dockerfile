FROM node:lts-alpine as common

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM common as development
CMD npm run start

FROM common as ci
CMD CI=true npm test