FROM oven/bun:latest AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY . .

FROM oven/bun:latest

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3005

CMD ["bun", "run", "index.ts"]
