import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { ProjectCategory } from "@shared/schema";
import { projectCategories } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get("/api/projects", async (req, res) => {
    try {
      const { category, search } = req.query;

      if (search && typeof search === "string") {
        const projects = await storage.searchProjects(search);
        return res.json(projects);
      }

      if (category && typeof category === "string" && projectCategories.includes(category as ProjectCategory)) {
        const projects = await storage.getProjectsByCategory(category as ProjectCategory);
        return res.json(projects);
      }

      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  return httpServer;
}
