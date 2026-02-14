
import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We don't really need a database for this client-side app, 
// but we'll define a simple schema to keep the build system happy.
export const attempts = pgTable("attempts", {
  id: serial("id").primaryKey(),
  success: boolean("success").default(true),
  timestamp: text("timestamp").notNull(),
});

export const insertAttemptSchema = createInsertSchema(attempts);
export type InsertAttempt = z.infer<typeof insertAttemptSchema>;
export type Attempt = typeof attempts.$inferSelect;
