import { DATABASE_URL } from '$env/static/private';
import * as schema from '$lib/server/db/schema.ts';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(DATABASE_URL, { prepare: false });

export const db = drizzle({ client, schema, casing: 'snake_case' });
