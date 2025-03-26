import { appIdeas, type AppIdea, type InsertAppIdea, users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User methods (keeping from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // App idea methods
  getAllIdeas(): Promise<AppIdea[]>;
  getIdea(id: number): Promise<AppIdea | undefined>;
  createIdea(idea: InsertAppIdea): Promise<AppIdea>;
  updateIdea(id: number, updates: Partial<AppIdea>): Promise<AppIdea | undefined>;
  deleteIdea(id: number): Promise<boolean>;
  getSavedIdeas(): Promise<AppIdea[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private ideas: Map<number, AppIdea>;
  currentUserId: number;
  currentIdeaId: number;

  constructor() {
    this.users = new Map();
    this.ideas = new Map();
    this.currentUserId = 1;
    this.currentIdeaId = 1;
  }

  // User methods (keeping from template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // App idea methods
  async getAllIdeas(): Promise<AppIdea[]> {
    return Array.from(this.ideas.values());
  }

  async getIdea(id: number): Promise<AppIdea | undefined> {
    return this.ideas.get(id);
  }

  async createIdea(insertIdea: InsertAppIdea): Promise<AppIdea> {
    const id = this.currentIdeaId++;
    
    // Ensure optional fields have proper null values rather than undefined
    const idea: AppIdea = { 
      ...insertIdea, 
      id,
      features: insertIdea.features || null,
      technicalConsiderations: insertIdea.technicalConsiderations || null,
      tags: insertIdea.tags || null,
      saved: insertIdea.saved || false
    };
    
    this.ideas.set(id, idea);
    return idea;
  }

  async updateIdea(id: number, updates: Partial<AppIdea>): Promise<AppIdea | undefined> {
    const existingIdea = this.ideas.get(id);
    if (!existingIdea) {
      return undefined;
    }

    const updatedIdea = { ...existingIdea, ...updates };
    this.ideas.set(id, updatedIdea);
    return updatedIdea;
  }

  async deleteIdea(id: number): Promise<boolean> {
    return this.ideas.delete(id);
  }

  async getSavedIdeas(): Promise<AppIdea[]> {
    return Array.from(this.ideas.values()).filter(idea => idea.saved);
  }
}

export const storage = new MemStorage();
