FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json bun.lock index.ts tsconfig.json ./
COPY src ./src
EXPOSE 3005
CMD ["bun", "run", "index.ts"]
