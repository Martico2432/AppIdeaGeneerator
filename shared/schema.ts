import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping it from the template)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// App idea schema
export const appIdeas = pgTable("app_ideas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  complexity: integer("complexity").notNull(), // 1-5 scale
  category: text("category").notNull(),
  techStack: text("tech_stack").array().notNull(),
  audience: text("audience").notNull(),
  features: text("features").array(),
  technicalConsiderations: text("technical_considerations").array(),
  tags: text("tags").array(),
  saved: boolean("saved").default(false),
  createdAt: text("created_at").notNull(), // Store as ISO string
});

export const insertAppIdeaSchema = createInsertSchema(appIdeas).omit({
  id: true
});

export type InsertAppIdea = z.infer<typeof insertAppIdeaSchema>;
export type AppIdea = typeof appIdeas.$inferSelect;

// Parameters for generating ideas
export const generationParams = z.object({
  complexity: z.number().min(1).max(5).default(3),
  category: z.string().default("all"),
  techFocus: z.array(z.string()).default([]),
  audience: z.string().default("general"),
});

export type GenerationParams = z.infer<typeof generationParams>;
