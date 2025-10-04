
FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm ci

COPY . /usr/src/app

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host"]