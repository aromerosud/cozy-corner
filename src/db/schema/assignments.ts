import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

import { users } from "./users";
import { classes } from "./classes";

export const assignments = pgTable(
  "assignments",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    classId: uuid("class_id"),

    title: varchar("title", { length: 200 }).notNull(),

    description: text("description"),

    dueDate: timestamp("due_date", {
      withTimezone: true,
    }),

    completed: boolean("completed").default(false).notNull(),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      name: "assignments_class_user_fk",
      columns: [table.classId, table.userId],
      foreignColumns: [classes.id, classes.userId],
    }),
  ],
);
