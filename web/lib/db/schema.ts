import { sql } from "drizzle-orm";
import {
  date,
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
    email: text("email").notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    phone_number: text("phone_number").notNull(),
    birthday: date("birthday").notNull(),
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
