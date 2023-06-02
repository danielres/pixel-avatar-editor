FROM node:18-alpine3.16 AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM node:18-alpine3.16 AS deploy-node
WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/pnpm-lock.yaml .
COPY --from=build /app/build ./build

RUN npm install -g pnpm --production
RUN pnpm install --frozen-lockfile --production

CMD [ "pnpm", "start" ]