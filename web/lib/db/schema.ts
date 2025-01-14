import { sql } from "drizzle-orm";
import {
  pgPolicy,
  pgSchema,
  pgTableCreator,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// edit this to create a table_prefix
const createTable = pgTableCreator((name) => `${name}`);

const getCreatedAtColumn = () =>
  timestamp({ withTimezone: true, mode: "date" }).notNull().defaultNow();
const getUpdatedAtColumn = () =>
  timestamp({ withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date());

const authSchema = pgSchema("auth");

const usersTable = authSchema.table("users", {
  id: uuid().primaryKey(),
});

export const dbProfiles = createTable(
  "profiles",
  {
    // Matches id from auth.users table in Supabase
    id: uuid()
      .primaryKey()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    created_at: getCreatedAtColumn(),
    updated_at: getUpdatedAtColumn(),
    email: text().notNull().unique(),
    first_name: text().notNull(),
    last_name: text().notNull(),
    phone_number: text().notNull(),
  },
  () => [
    pgPolicy("Users can view their own profile", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(select auth.uid()) = id`,
    }),
  ]
).enableRLS();

export type Profile = typeof dbProfiles.$inferSelect;
