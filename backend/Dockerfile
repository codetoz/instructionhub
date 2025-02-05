
ARG BUILD_BASE_IMAGE=node:20.16.0-bookworm
ARG PRODUCTION_BASE_IMAGE=node:20.16.0-bookworm

FROM ${BUILD_BASE_IMAGE} AS build
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

COPY package*.json yarn*.lock ./
RUN yarn config set disable-self-update-check true --global &&\
  yarn config set enableTelemetry false --global &&\
  yarn install --frozen-lockfile --network-timeout 100000 &&\
  yarn cache clean

COPY . .
RUN yarn build

FROM ${PRODUCTION_BASE_IMAGE} AS production
ENV NODE_ENV production
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates &&\
  npm config set update-notifier false
WORKDIR /app
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=node:node --from=build /app/node_modules /app/node_modules 

COPY --chown=node:node .env* ./
COPY --chown=node:node --from=build /app/dist /app/dist 

ARG START_APP_PATH=./dist/main.js

CMD ["dumb-init", "node", "${ARGS} ${START_APP_PATH}"]
