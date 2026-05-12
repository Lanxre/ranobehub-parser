import { fetchHandler } from '@/handlers';

const PORT = process.env.SERVER_PORT || 3000;

const server = Bun.serve({
  port: PORT,
  fetch: fetchHandler,
  idleTimeout: 255,
});

console.log(`🦊 Server is running at http://localhost:${server.port}`);
