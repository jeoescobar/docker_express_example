FROM node:12-stretch-slim AS base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./


RUN npm install 
RUN npm install nodemon -D
RUN npm install mongoose -g
RUN npm install body-parser -g
RUN npm install multer -g

COPY . .

EXPOSE 3001

CMD ["npm","run","dev"]