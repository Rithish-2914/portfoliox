import { z } from "zod";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const projectCategories = [
  "all",
  "html-css",
  "javascript",
  "animations",
  "games",
  "forms-ui"
] as const;

export type ProjectCategory = typeof projectCategories[number];

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
  technologies: text("technologies").notNull(),
  features: text("features").notNull(),
  sourceCodeUrl: varchar("source_code_url", { length: 500 }).notNull(),
  liveDemoUrl: varchar("live_demo_url", { length: 500 }).notNull(),
  htmlCode: text("html_code"),
  cssCode: text("css_code"),
  jsCode: text("js_code"),
});

export const insertProjectDbSchema = createInsertSchema(projects);

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  category: z.enum(projectCategories),
  technologies: z.array(z.string()),
  features: z.array(z.string()),
  sourceCodeUrl: z.string(),
  liveDemoUrl: z.string(),
  htmlCode: z.string().optional().nullable(),
  cssCode: z.string().optional().nullable(),
  jsCode: z.string().optional().nullable(),
});

export type Project = z.infer<typeof projectSchema>;

export const insertProjectSchema = projectSchema.omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;

export const updateProjectCodeSchema = z.object({
  htmlCode: z.string().optional().nullable(),
  cssCode: z.string().optional().nullable(),
  jsCode: z.string().optional().nullable(),
});
export type UpdateProjectCode = z.infer<typeof updateProjectCodeSchema>;

export const categoryLabels: Record<ProjectCategory, string> = {
  "all": "All Projects",
  "html-css": "HTML/CSS Only",
  "javascript": "JavaScript Apps",
  "animations": "Animations",
  "games": "Interactive Games",
  "forms-ui": "Forms & UI"
};

export const users = null;
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = { id: string; username: string; password: string };
