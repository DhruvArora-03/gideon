import { USER_ROLES } from '../../models';
import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  time,
  timestamp,
  unique,
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

export const userRole = pgEnum('user_role', USER_ROLES);

export const profiles = createTable('profiles', {
  // Matches id from auth.users table in Supabase
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  active: boolean().notNull().default(true),
  email: text().notNull().unique(),
  first_name: text().notNull(),
  last_name: text().notNull(),
  phone_number: text().notNull(),
  role: userRole().notNull().default('employee'),
});

export type NewProfile = typeof profiles.$inferInsert;
export type Profile = typeof profiles.$inferSelect;

export const profileRelations = relations(profiles, ({ many }) => ({
  assignments: many(assignments, {
    relationName: 'profile_assignments',
  }),
  sessions: many(sessions, {
    relationName: 'profile_sessions',
  }),
}));

export const defaultSlots = createTable('default_slots', {
  id: serial().primaryKey(),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  dotw: integer().notNull(),
  start_time: time().notNull(),
  end_time: time().notNull(),
  capacity: integer().notNull(),
});

export type NewDefaultSlot = typeof defaultSlots.$inferInsert;
export type DefaultSlot = typeof defaultSlots.$inferSelect;

export const defaultSlotsRelations = relations(defaultSlots, ({ many }) => ({
  slots: many(slots, {
    relationName: 'default_slot_slots',
  }),
}));

export const slots = createTable('slots', {
  id: serial().primaryKey(),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  date: date().notNull(),
  start_time: time().notNull(),
  end_time: time().notNull(),
  capacity: integer().notNull(),
});

export type NewSlot = typeof slots.$inferInsert;
export type Slot = typeof slots.$inferSelect;
export type SlotWithAssignments = Slot & {
  assignments: Assignment[];
};
export type AssignmentWithSlot = Assignment & {
  slot: Slot;
};

export const slotsRelations = relations(slots, ({ many }) => ({
  assignments: many(assignments, {
    relationName: 'slot_assignments',
  }),
}));

export const assignmentStatus = pgEnum('assignment_status', ['confirmed', 'waitlisted']);

export type AssignmentStatus = (typeof assignmentStatus.enumValues)[number];

export const assignments = createTable(
  'assignments',
  {
    id: serial().primaryKey(),
    created_at: getCreatedAtColumn(),
    updated_at: getUpdatedAtColumn(),
    user_id: uuid()
      .notNull()
      .references(() => profiles.id),
    slot_id: integer()
      .notNull()
      .references(() => slots.id),
    assignment_status: assignmentStatus().notNull(),
  },
  (t) => [unique().on(t.user_id, t.slot_id)],
);

export type NewAssignment = typeof assignments.$inferInsert;
export type Assignment = typeof assignments.$inferSelect;

export const assignmentsRelations = relations(assignments, ({ one }) => ({
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
}));

export const sessions = createTable('sessions', {
  id: serial().primaryKey(),
  created_at: getCreatedAtColumn(),
  updated_at: getUpdatedAtColumn(),
  user_id: uuid()
    .notNull()
    .references(() => profiles.id),
  clock_in: timestamp({ mode: 'date' }).notNull(),
  clock_out: timestamp({ mode: 'date' }),
  employee_notes: text(),
  admin_notes: text(),
  was_scheduled: boolean().notNull(),
});

export type NewSession = typeof sessions.$inferInsert;
export type Session = typeof sessions.$inferSelect;

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(profiles, {
    fields: [sessions.user_id],
    references: [profiles.id],
    relationName: 'session_user',
  }),
}));
