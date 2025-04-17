# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=3000

WORKDIR /src

# Build
FROM base as build

# Copy package.json and pnpm-lock.yaml
COPY --link pnpm-lock.yaml package.json ./

# Install pnpm if not already installed
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY --link . .

# Build the Nuxt.js application
RUN pnpm run build

# Run
FROM base

ENV PORT=$PORT
ENV NODE_ENV=production

# Copy the build output from the build stage
COPY --from=build /src/.output /src/.output

# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
