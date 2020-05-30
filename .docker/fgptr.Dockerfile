FROM node:12.16-alpine AS builder

WORKDIR /opt/ctr

COPY fgptr fgptr
COPY common common
COPY package.json yarn.lock tsconfig.json ./

RUN yarn install --frozen-lockfile
RUN yarn ws:fgptr build

# Real app
FROM node:12.16-alpine

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /opt/fgptr
COPY common ../common
COPY fgptr/package.json yarn.lock ./

RUN yarn install --production --cache-folder ./ycache; rm -rf ./ycache

COPY --from=builder /opt/ctr/fgptr/dist ./dist

EXPOSE 3022
CMD ["yarn", "start"]
