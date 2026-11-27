import {
  pgTable,
  uuid,
  varchar,
  jsonb,
  boolean,
  integer,
  check,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "./users";

export const dashboardPreferences = pgTable(
  "dashboard_preferences",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id),

    theme: varchar("theme", { length: 50 }).default("default").notNull(),

    visibleWidgets: jsonb("visible_widgets").default({}).notNull(),

    hydrationEnabled: boolean("hydration_enabled").default(false).notNull(),

    hydrationInterval: integer("hydration_interval"),

    breakDuration: integer("break_duration").default(5).notNull(),

    timeZone: varchar("time_zone", { length: 100 }).notNull(),
  },
  (table) => [
    check(
      "hydration_interval_positive",
      sql`${table.hydrationInterval} IS NULL OR ${table.hydrationInterval} > 0`,
    ),
    check("break_duration_positive", sql`${table.breakDuration} > 0`),
  ],
);
