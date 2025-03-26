import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAppIdeaSchema, generationParams } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for app ideas
  app.get("/api/ideas", async (req, res) => {
    try {
      const ideas = await storage.getAllIdeas();
      res.json(ideas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ideas" });
    }
  });

  app.get("/api/ideas/saved", async (req, res) => {
    try {
      const savedIdeas = await storage.getSavedIdeas();
      res.json(savedIdeas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved ideas" });
    }
  });

  app.get("/api/ideas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const idea = await storage.getIdea(id);
      if (!idea) {
        return res.status(404).json({ message: "Idea not found" });
      }

      res.json(idea);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch idea" });
    }
  });

  app.post("/api/ideas", async (req, res) => {
    try {
      const newIdea = insertAppIdeaSchema.parse(req.body);
      const createdIdea = await storage.createIdea(newIdea);
      res.status(201).json(createdIdea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid idea data", 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: "Failed to create idea" });
    }
  });

  app.patch("/api/ideas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const updates = req.body;
      const updatedIdea = await storage.updateIdea(id, updates);
      
      if (!updatedIdea) {
        return res.status(404).json({ message: "Idea not found" });
      }

      res.json(updatedIdea);
    } catch (error) {
      res.status(500).json({ message: "Failed to update idea" });
    }
  });

  app.delete("/api/ideas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const deleted = await storage.deleteIdea(id);
      if (!deleted) {
        return res.status(404).json({ message: "Idea not found" });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete idea" });
    }
  });

  // Generate new idea with parameters
  app.post("/api/generate", async (req, res) => {
    try {
      const params = generationParams.parse(req.body);
      
      // This is just a placeholder for idea generation
      // The actual generation logic is handled on the frontend in this case
      // since it doesn't require database access and is purely algorithmic
      
      res.status(200).json({ 
        message: "Generation parameters validated",
        params
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid generation parameters", 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: "Failed to process generation request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
