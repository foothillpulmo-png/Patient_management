import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const concerns = pgTable("concerns", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  patientName: text("patient_name").notNull(),
  patientDob: text("patient_dob").notNull(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertConcernSchema = createInsertSchema(concerns).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertConcern = z.infer<typeof insertConcernSchema>;
export type Concern = typeof concerns.$inferSelect;

export const callDocumentation = pgTable("call_documentation", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  concernId: varchar("concern_id").notNull(),
  agentName: text("agent_name").notNull(),
  callNotes: text("call_notes").notNull(),
  resolution: text("resolution"),
  agentMessage: text("agent_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCallDocSchema = createInsertSchema(callDocumentation).omit({
  id: true,
  createdAt: true,
});

export type InsertCallDoc = z.infer<typeof insertCallDocSchema>;
export type CallDoc = typeof callDocumentation.$inferSelect;

export const images = pgTable("images", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  concernId: varchar("concern_id"),
  callDocId: varchar("call_doc_id"),
  filename: text("filename").notNull(),
  mimetype: text("mimetype").notNull(),
  size: integer("size").notNull(),
  path: text("path").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const insertImageSchema = createInsertSchema(images).omit({
  id: true,
  uploadedAt: true,
});

export type InsertImage = z.infer<typeof insertImageSchema>;
export type Image = typeof images.$inferSelect;

export const chatMessages = pgTable("chat_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  concernId: varchar("concern_id").notNull(),
  sender: text("sender").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({
  id: true,
  createdAt: true,
});

export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;
