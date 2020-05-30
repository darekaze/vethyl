FROM node:12.16-alpine AS builder

WORKDIR /opt/ctr

COPY crawler crawler
COPY common common
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile
RUN yarn ws:crawler build

# Real app
FROM node:12.16-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/crawler
COPY common ../common
COPY crawler/package.json yarn.lock ./

RUN yarn install --production --cache-folder ./ycache; rm -rf ./ycache

COPY --from=builder /opt/ctr/crawler/dist ./dist

EXPOSE 3007
CMD ["yarn", "start"]
