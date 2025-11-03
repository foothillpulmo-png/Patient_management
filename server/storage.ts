import { 
  type User, 
  type InsertUser,
  type Concern,
  type InsertConcern,
  type CallDoc,
  type InsertCallDoc,
  type Image,
  type InsertImage,
  type ChatMessage,
  type InsertChatMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Concern methods
  getConcern(id: string): Promise<Concern | undefined>;
  getConcerns(): Promise<Concern[]>;
  getConcernsByCategory(category: string): Promise<Concern[]>;
  getConcernsByPatient(patientName: string, patientDob: string): Promise<Concern[]>;
  createConcern(concern: InsertConcern): Promise<Concern>;
  updateConcernStatus(id: string, status: string): Promise<Concern | undefined>;

  // Call documentation methods
  getCallDocs(concernId: string): Promise<CallDoc[]>;
  createCallDoc(callDoc: InsertCallDoc): Promise<CallDoc>;

  // Image methods
  getImages(concernId?: string, callDocId?: string): Promise<Image[]>;
  createImage(image: InsertImage): Promise<Image>;
  deleteImage(id: string): Promise<boolean>;

  // Chat message methods
  getChatMessages(concernId: string): Promise<ChatMessage[]>;
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private concerns: Map<string, Concern>;
  private callDocs: Map<string, CallDoc>;
  private images: Map<string, Image>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.users = new Map();
    this.concerns = new Map();
    this.callDocs = new Map();
    this.images = new Map();
    this.chatMessages = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getConcern(id: string): Promise<Concern | undefined> {
    return this.concerns.get(id);
  }

  async getConcerns(): Promise<Concern[]> {
    return Array.from(this.concerns.values()).sort(
      (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
    );
  }

  async getConcernsByCategory(category: string): Promise<Concern[]> {
    return Array.from(this.concerns.values())
      .filter((c) => c.category === category)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getConcernsByPatient(patientName: string, patientDob: string): Promise<Concern[]> {
    return Array.from(this.concerns.values())
      .filter((c) => c.patientName === patientName && c.patientDob === patientDob)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async createConcern(insertConcern: InsertConcern): Promise<Concern> {
    const id = randomUUID();
    const now = new Date();
    const concern: Concern = { 
      id,
      patientName: insertConcern.patientName,
      patientDob: insertConcern.patientDob,
      category: insertConcern.category,
      title: insertConcern.title,
      status: insertConcern.status ?? "pending",
      createdAt: now,
      updatedAt: now
    };
    this.concerns.set(id, concern);
    return concern;
  }

  async updateConcernStatus(id: string, status: string): Promise<Concern | undefined> {
    const concern = this.concerns.get(id);
    if (!concern) return undefined;
    
    const updated: Concern = {
      ...concern,
      status,
      updatedAt: new Date()
    };
    this.concerns.set(id, updated);
    return updated;
  }

  async getCallDocs(concernId: string): Promise<CallDoc[]> {
    return Array.from(this.callDocs.values())
      .filter((doc) => doc.concernId === concernId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createCallDoc(insertCallDoc: InsertCallDoc): Promise<CallDoc> {
    const id = randomUUID();
    const callDoc: CallDoc = {
      id,
      concernId: insertCallDoc.concernId,
      agentName: insertCallDoc.agentName,
      callNotes: insertCallDoc.callNotes,
      resolution: insertCallDoc.resolution ?? null,
      agentMessage: insertCallDoc.agentMessage ?? null,
      createdAt: new Date()
    };
    this.callDocs.set(id, callDoc);
    return callDoc;
  }

  async getImages(concernId?: string, callDocId?: string): Promise<Image[]> {
    return Array.from(this.images.values())
      .filter((img) => {
        if (concernId && img.concernId !== concernId) return false;
        if (callDocId && img.callDocId !== callDocId) return false;
        return true;
      })
      .sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const id = randomUUID();
    const image: Image = {
      id,
      concernId: insertImage.concernId ?? null,
      callDocId: insertImage.callDocId ?? null,
      filename: insertImage.filename,
      mimetype: insertImage.mimetype,
      size: insertImage.size,
      path: insertImage.path,
      uploadedAt: new Date()
    };
    this.images.set(id, image);
    return image;
  }

  async deleteImage(id: string): Promise<boolean> {
    return this.images.delete(id);
  }

  async getChatMessages(concernId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter((msg) => msg.concernId === concernId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      createdAt: new Date()
    };
    this.chatMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
