import { env } from 'cloudflare:workers';
export function recordsDb(){if(!env.DB) throw new Error('Database unavailable'); return env.DB;}
