FROM node:18-alpine3.16

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .
# RUN yarn prisma migrate deploy
# RUN yarn prisma generate
# RUN yarn vite build

CMD [ "pnpm", "start" ]