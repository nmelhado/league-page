FROM mhart/alpine-node:14

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm rebuild esbuild
RUN npm run build

EXPOSE 3000
CMD npm run dev -- --host