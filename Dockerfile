# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.10.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app


FROM base as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm install

COPY . .
CMD npm run dev
