import { Router } from "express";
import { db } from "../db.js";

export const chaptersRouter = Router();

chaptersRouter.get("/", (req, res) => {
  const chapters = db.prepare("SELECT * FROM chapters ORDER BY name").all();
  res.json(chapters);
});

chaptersRouter.post("/", (req, res) => {
  const { name, campus, city, state, lat, lon } = req.body;
  if (!name || !city || !state || lat == null || lon == null) {
    return res.status(400).json({ error: "name, city, state, lat, lon are required" });
  }
  try {
    const result = db
      .prepare(
        `INSERT INTO chapters (name, campus, city, state, lat, lon, is_custom)
         VALUES (?, ?, ?, ?, ?, ?, 1)`
      )
      .run(name.trim(), campus || null, city.trim(), state.trim(), lat, lon);
    const chapter = db.prepare("SELECT * FROM chapters WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json(chapter);
  } catch (err) {
    if (String(err.message).includes("UNIQUE")) {
      return res.status(409).json({ error: "A chapter with that name already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});
