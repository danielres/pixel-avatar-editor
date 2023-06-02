FROM node:18-alpine3.16 AS build
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM node:18-alpine3.16 AS deploy-node
WORKDIR /app
RUN npm install -g pnpm
COPY --from=build /app/package.json .
COPY --from=build /app/build ./build
RUN pnpm install --production
CMD [ "pnpm", "start" ]