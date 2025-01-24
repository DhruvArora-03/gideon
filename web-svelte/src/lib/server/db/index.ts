import { ADMIN_DATABASE_URL, DATABASE_URL } from '$env/static/private';
import { createDrizzle } from '$lib/server/db/drizzle';
import { decode } from '$lib/server/db/jwt';
import * as schema from '$lib/server/db/schema.ts';
import type { Session } from '@supabase/supabase-js';
import type { DrizzleConfig } from 'drizzle-orm';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

export type Database = PostgresJsDatabase<typeof schema>;

const config = {
  casing: 'snake_case',
  schema,
} satisfies DrizzleConfig<typeof schema>;

// ByPass RLS
const admin = drizzle({
  client: postgres(ADMIN_DATABASE_URL, { prepare: false }),
  ...config,
});

// Protected by RLS
const client = drizzle({
  client: postgres(DATABASE_URL, { prepare: false }),
  ...config,
});

export async function createDrizzleSupabaseClient(session: Session | null) {
  const token = decode(session?.access_token ?? '');

  return createDrizzle(token, { admin, client });
}
