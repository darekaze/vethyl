FROM node:12.16-alpine AS builder

WORKDIR /opt/ctr

COPY api api
COPY common common
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile
RUN yarn ws:api build

# Real app
FROM node:12.16-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/api
COPY common ../common
COPY api/.env.production api/package.json yarn.lock ./

RUN yarn install --production --cache-folder ./ycache; rm -rf ./ycache

COPY --from=builder /opt/ctr/api/dist ./dist

EXPOSE 8080
CMD ["yarn", "start:prod"]
