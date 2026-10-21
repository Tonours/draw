# The official 22.23.4 Alpine image has no platform manifest yet. Pin the amd64
# 22.23.3 Alpine manifest and replace its Node binary with the official
# 22.23.4 linux-x64-musl release, verified against Node's SHASUMS256.txt.
FROM node:22.23.3-alpine@sha256:2c752226d477b4a886378baa95b9af252be59301b725fdb0b7e15208131505a8 AS patched-node
ENV NODE_VERSION=22.23.4
ADD --checksum=sha256:38355b952f0392b91703d38a0d9af84eb0ff77d69828ca4bc8cc3bc3af80a720 https://nodejs.org/dist/v22.23.4/node-v22.23.4-linux-x64-musl.tar.xz /tmp/node.tar.xz
RUN tar -xJf /tmp/node.tar.xz -C /usr/local/bin --strip-components=2 node-v22.23.4-linux-x64-musl/bin/node \
    && rm /tmp/node.tar.xz \
    && test "$(node --version)" = "v${NODE_VERSION}"

FROM patched-node AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build \
    && yarn install --frozen-lockfile --production --ignore-scripts \
    && yarn cache clean

FROM patched-node AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=node:node /app/package.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/build ./build
USER node
EXPOSE 3000
CMD ["node_modules/.bin/remix-serve", "./build/server/index.js"]
