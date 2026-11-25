import { sql } from "drizzle-orm";

import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  text,
  timestamp,
  check,
  foreignKey,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { classes } from "./classes";

export const noteKindEnum = pgEnum("note_kind", ["class", "quick"]);

export const notes = pgTable(
  "notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    classId: uuid("class_id"),

    kind: noteKindEnum("kind").notNull(),

    title: varchar("title", { length: 200 }).notNull(),

    content: text("content").notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check(
      "notes_class_association_check",
      sql`(${table.kind} = 'class' AND ${table.classId} IS NOT NULL) OR (${table.kind} = 'quick' AND ${table.classId} IS NULL)`,
    ),

    foreignKey({
      name: "notes_class_user_fk",
      columns: [table.classId, table.userId],
      foreignColumns: [classes.id, classes.userId],
    }),
  ],
);
