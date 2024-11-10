# syntax=docker/dockerfile:1


FROM oven/bun:alpine as base

WORKDIR /usr/src/app


FROM base as build

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    bun install

COPY . .
CMD bun run dev
