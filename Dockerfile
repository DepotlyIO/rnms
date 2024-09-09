# syntax = docker/dockerfile:1

FROM node:22-alpine AS build

RUN corepack enable

WORKDIR /build

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY . .

RUN pnpm install

FROM node:22-alpine AS production

WORKDIR /app

COPY --from=build /build/.output/server /app
