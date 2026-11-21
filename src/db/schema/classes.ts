import { sql } from "drizzle-orm";

import {
  pgTable,
  uuid,
  varchar,
  text,
  time,
  check,
  unique,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const classes = pgTable(
  "classes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id),

    name: varchar("name", { length: 150 }).notNull(),

    meetingDays: text("meeting_days").array().notNull(),

    startTime: time("start_time").notNull(),

    endTime: time("end_time").notNull(),

    location: text("location"),

    color: varchar("color", { length: 30 }),
  },
  (table) => [
    check("classes_time_check", sql`${table.endTime} > ${table.startTime}`),
    unique("classes_id_user_id_unique").on(table.id, table.userId),
  ],
);
