import { relations, sql } from "drizzle-orm";
import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  role: userRoleEnum("role").default("user"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const holidays = pgTable("holidays", {
  id: uuid("id").defaultRandom().primaryKey(),
  holidayFile: text("holiday_file").notNull(),
  holidaysLeft: numeric("holidays_left").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tripType = pgEnum("trip_type", ["solo", "family", "friends"]);

export const trip = pgTable("trip", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  noOfHolidaysUsed: numeric("no_of_holidays_used").notNull(),
  tripType: tripType("trip_type").notNull(),
  tripChangeRequest: text("trip_change_request"),
  noOfChangeRequest: numeric("no_of_change_request").notNull().default("0"),
  noOfDaysTrip: numeric("no_of_days_trip").notNull(),
  expectedBudget: numeric("expected_budget").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const tripPlan = pgTable("trip_plan", {
  id: uuid("id").defaultRandom().primaryKey(),
  tripId: uuid("trip_id")
    .notNull()
    .references(() => trip.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tripTitle: text("trip_title").notNull(),
  tripDescription: text("trip_description").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const days = pgTable("days", {
  id: uuid("id").defaultRandom().primaryKey(),
  tripPlanId: uuid("trip_plan_id")
    .notNull()
    .references(() => tripPlan.id, { onDelete: "cascade" }),
  dayNumber: numeric("day_number").notNull(),
  transportDetails: text("transport_details").notNull(),
  placesToVisitDetails: text("places_to_visit_details")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
  budgetExpected: integer("budget_expected").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  trips: many(trip),
  tripPlans: many(tripPlan),
}));

export const holidayRelations = relations(holidays, ({ one }) => ({
  user: one(users),
}));

export const tripRelations = relations(trip, ({ one }) => ({
  user: one(users, {
    fields: [trip.userId],
    references: [users.id],
  }),
  tripPlan: one(tripPlan),
}));

export const tripPlanRelations = relations(tripPlan, ({ one, many }) => ({
  trip: one(trip, {
    fields: [tripPlan.tripId],
    references: [trip.id],
  }),
  user: one(users, {
    fields: [tripPlan.userId],
    references: [users.id],
  }),
  days: many(days),
}));

export const daysRelations = relations(days, ({ one }) => ({
  tripPlan: one(tripPlan, {
    fields: [days.tripPlanId],
    references: [tripPlan.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Holiday = typeof holidays.$inferSelect;
export type NewHoliday = typeof holidays.$inferInsert;

export type Trip = typeof trip.$inferSelect;
export type NewTrip = typeof trip.$inferInsert;

export type TripPlan = typeof tripPlan.$inferSelect;
export type NewTripPlan = typeof tripPlan.$inferInsert;

export type Day = typeof days.$inferSelect;
export type NewDay = typeof days.$inferInsert;
