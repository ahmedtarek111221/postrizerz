// src/lib/cloudflare.ts
import { Context } from 'hono';

interface Env {
  DB: D1Database;
  ASSETS: any;
}

export function getCloudflareContext() {
  // @ts-ignore - This is injected by Cloudflare Workers
  const env = process.env.CLOUDFLARE_CONTEXT as Env;
  return { env };
}
