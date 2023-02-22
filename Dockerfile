FROM node:14-bullseye AS base

WORKDIR /app

# Step 2: Builder
FROM base AS builder

COPY package*.json ./

RUN npm install

COPY . .

RUN npm prune --production

# Step 3: Release
FROM base AS release

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/src /app/src
COPY --from=builder /app/pm2.config.js /app/pm2.config.js
RUN npm install pm2 -g

CMD ["pm2-runtime", "pm2.config.js"]