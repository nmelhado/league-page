FROM node:14-alpine

WORKDIR /app

# Install required deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy in source and build the app
COPY . .
RUN npm run build-docker

EXPOSE 3000

# Wrap Node.js with Tini since it wasn't designed to be run as PID 1
# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals
RUN apk add --no-cache tini
ENTRYPOINT ["tini", "--"]
CMD ["node", "./build"]
