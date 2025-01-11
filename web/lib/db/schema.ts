import { sql } from "drizzle-orm";
import {
  pgPolicy,
  pgSchema,
  pgTableCreator,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// edit this to create a table_prefix
const createTable = pgTableCreator((name) => `${name}`);

const getCreatedAtColumn = () =>
  timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow();
const getUpdatedAtColumn = () =>
  timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date());

const authSchema = pgSchema("auth");

const usersTable = authSchema.table("users", {
  id: uuid("id").primaryKey(),
});

export const dbProfiles = createTable(
  "profiles",
  {
    // Matches id from auth.users table in Supabase
    id: uuid("id")
      .primaryKey()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    created_at: getCreatedAtColumn(),
    updated_at: getUpdatedAtColumn(),
  },
  () => [
    pgPolicy("Users can view their own profile", {
      as: "permissive",
      for: "select",
      to: ["public"],
      using: sql`(select auth.uid()) = id`,
    }),
  ]
);
