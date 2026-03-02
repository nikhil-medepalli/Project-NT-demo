import { db } from "./index";
import { eq } from "drizzle-orm";
import {
  users,
  holidays,
  trip,
  tripPlan,
  days,
  type NewUser,
  type NewHoliday,
  type NewTrip,
  type NewTripPlan,
  type NewDay,
} from "./schema";

// User queries

export const createUser = async (data: NewUser) => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({ where: eq(users.id, id) });
};

export const updateUser = async (id: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    throw new Error(`User with id ${id} not found`);
  }

  const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return user;
};

export const upsertUser = async (data: NewUser) => {
  const [user] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning();
  return user;
};