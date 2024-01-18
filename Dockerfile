ARG NODE_VERSION=18.17.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER root

COPY . .

RUN npm install --save-exact --save-dev typescript @types/react @types/node

ENV POSTGRES_PRISMA_URL "postgresql://postgres:admin@db:5432/postgres?schema=public"

RUN npx prisma generate

EXPOSE 3000

CMD npx prisma db push ; npm run dev