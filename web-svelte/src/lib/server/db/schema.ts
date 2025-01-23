import {
  date,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { authUsers } from 'drizzle-orm/supabase';

// edit this to create a table_prefix
const createTable = pgTableCreator((name) => `${name}`);

const getCreatedAtColumn = () =>
  timestamp({ withTimezone: true, mode: 'date' }).notNull().defaultNow();
const getUpdatedAtColumn = () =>
  timestamp({ withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date());

export const profiles = createTable('profiles', {
  // Matches id from auth.users table in Supabase
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id, { onDelete: 'cascade' }),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  email: text().notNull().unique(),
  first_name: text().notNull(),
  last_name: text().notNull(),
  phone_number: text().notNull(),
});

export const slots = createTable('slots', {
  id: serial().primaryKey(),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  date: date().notNull(),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
  capacity: integer().notNull(),
});

export const dbAssignmentStatus = pgEnum('assignment_status', [
  'confirmed',
  'waitlisted',
  'cancelled',
]);

export const assignments = createTable('assignments', {
  id: serial().primaryKey(),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  user_id: uuid()
    .notNull()
    .references(() => profiles.id, {
      onDelete: 'cascade',
    }),
  slot_id: integer()
    .notNull()
    .references(() => slots.id, {
      onDelete: 'cascade',
    }),
  assignment_status: dbAssignmentStatus().notNull(),
});

export type Profile = typeof profiles.$inferSelect;

export type NewSlot = typeof slots.$inferSelect;
export type Slot = typeof slots.$inferSelect;

export type NewAssignment = typeof assignments.$inferSelect;
export type Assignment = typeof assignments.$inferSelect;
