import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { handleDemo } from "./routes/demo";
import { handleContact } from "./routes/contact";
import { handleInternship } from "./routes/internship";
import { handleCareer } from "./routes/career";

export function createServer() {
  const app = express();
  const upload = multer({ storage: multer.memoryStorage() });

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);
  app.post("/api/contact", handleContact);
  app.post("/api/internship", upload.single("portfolioFile"), handleInternship);
  app.post("/api/career", upload.single("portfolioFile"), handleCareer);

  return app;
}

