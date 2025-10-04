FROM node:22.2.0-slim AS development

WORKDIR /usr/src/app

# Install CA certs
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json
COPY prisma /usr/src/app/prisma
COPY wrangler.toml /usr/src/app/wrangler.toml

RUN npm ci

COPY . /usr/src/app

RUN npx prisma generate --no-engine

EXPOSE 8787

CMD [ "npm", "run", "dev", "--", "--ip=0.0.0.0"]