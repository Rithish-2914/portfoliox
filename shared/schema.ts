import { z } from "zod";

export const projectCategories = [
  "all",
  "html-css",
  "javascript",
  "animations",
  "games",
  "forms-ui"
] as const;

export type ProjectCategory = typeof projectCategories[number];

export const projectSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  category: z.enum(projectCategories),
  technologies: z.array(z.string()),
  features: z.array(z.string()),
  sourceCodeUrl: z.string(),
  liveDemoUrl: z.string(),
  htmlCode: z.string().optional(),
  cssCode: z.string().optional(),
  jsCode: z.string().optional(),
});

export type Project = z.infer<typeof projectSchema>;

export const insertProjectSchema = projectSchema.omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;

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
