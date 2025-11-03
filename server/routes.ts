import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertConcernSchema, insertCallDocSchema, insertImageSchema, insertChatMessageSchema } from "@shared/schema";

const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only image files are allowed"));
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/concerns", async (_req, res) => {
    const concerns = await storage.getConcerns();
    res.json(concerns);
  });

  app.get("/api/concerns/category/:category", async (req, res) => {
    const concerns = await storage.getConcernsByCategory(req.params.category);
    res.json(concerns);
  });

  app.get("/api/concerns/patient/:name/:dob", async (req, res) => {
    const concerns = await storage.getConcernsByPatient(req.params.name, req.params.dob);
    res.json(concerns);
  });

  app.post("/api/concerns", async (req, res) => {
    try {
      const validatedData = insertConcernSchema.parse(req.body);
      const concern = await storage.createConcern(validatedData);
      res.json(concern);
    } catch (error) {
      res.status(400).json({ error: "Invalid concern data" });
    }
  });

  app.patch("/api/concerns/:id/status", async (req, res) => {
    const { status } = req.body;
    const validStatuses = ["pending", "urgent", "overdue", "tasked", "done"];
    
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    
    const concern = await storage.updateConcernStatus(req.params.id, status);
    if (!concern) {
      return res.status(404).json({ error: "Concern not found" });
    }
    res.json(concern);
  });

  app.get("/api/concerns/:concernId/call-docs", async (req, res) => {
    const callDocs = await storage.getCallDocs(req.params.concernId);
    res.json(callDocs);
  });

  app.post("/api/call-docs", async (req, res) => {
    try {
      const validatedData = insertCallDocSchema.parse(req.body);
      const callDoc = await storage.createCallDoc(validatedData);
      res.json(callDoc);
    } catch (error) {
      res.status(400).json({ error: "Invalid call documentation data" });
    }
  });

  app.get("/api/concerns/:concernId/chat", async (req, res) => {
    const messages = await storage.getChatMessages(req.params.concernId);
    res.json(messages);
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid chat message data" });
    }
  });

  app.post("/api/images/upload", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageData = {
        concernId: req.body.concernId || null,
        callDocId: req.body.callDocId || null,
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.filename,
      };

      const validatedData = insertImageSchema.parse(imageData);
      const image = await storage.createImage(validatedData);
      res.json(image);
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      res.status(400).json({ error: "Failed to save image" });
    }
  });

  app.get("/api/images/:concernId", async (req, res) => {
    const images = await storage.getImages(req.params.concernId);
    res.json(images);
  });

  app.get("/api/images/file/:filename", async (req, res) => {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(uploadsDir, filename);
    const normalizedPath = path.normalize(filePath);
    
    if (!normalizedPath.startsWith(uploadsDir)) {
      return res.status(403).json({ error: "Access denied" });
    }
    
    if (fs.existsSync(normalizedPath)) {
      res.sendFile(normalizedPath);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  });

  app.delete("/api/images/:id", async (req, res) => {
    const images = await storage.getImages();
    const image = images.find((img) => img.id === req.params.id);
    
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const filePath = path.join(uploadsDir, image.path);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await storage.deleteImage(req.params.id);
    res.json({ success: true });
  });

  const httpServer = createServer(app);

  return httpServer;
}
