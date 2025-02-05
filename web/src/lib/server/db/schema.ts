import { relations } from 'drizzle-orm';
import {
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
  start_time: timestamp({ withTimezone: true, mode: 'date' }).notNull(),
  end_time: timestamp({ withTimezone: true, mode: 'date' }).notNull(),
  capacity: integer().notNull(),
});

export type NewSlot = typeof slots.$inferInsert;
export type Slot = typeof slots.$inferSelect;

export const slotsRelations = relations(slots, ({ many }) => {
  return {
    assignments: many(assignments, {
      relationName: 'slot_assignments',
    }),
  };
});

export type SlotWithAssignments = Slot & {
  assignments: Assignment[];
};

export const assignmentStatus = pgEnum('assignment_status', [
  'confirmed',
  'waitlisted',
  'cancelled',
]);

export type AssignmentStatus = (typeof assignmentStatus.enumValues)[number];

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
  assignment_status: assignmentStatus().notNull(),
});

export type NewAssignment = typeof assignments.$inferInsert;
export type Assignment = typeof assignments.$inferSelect;

export const assignmentsRelations = relations(assignments, ({ one }) => {
  return {
    slot: one(slots, {
      fields: [assignments.slot_id],
      references: [slots.id],
      relationName: 'slot_assignments',
    }),
    user: one(profiles, {
      fields: [assignments.user_id],
      references: [profiles.id],
      relationName: 'assignment_user',
    }),
  };
});
