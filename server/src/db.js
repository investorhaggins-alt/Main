import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SEED_CHAPTERS } from "./data/chapters.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "que_tracker.db");

export const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    campus TEXT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    is_custom INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS brothers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    area_code TEXT,
    area_code_region TEXT,
    chapter_id INTEGER REFERENCES chapters(id),
    chapter_name TEXT,
    campus TEXT,
    city TEXT,
    state TEXT,
    lat REAL,
    lon REAL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

const chapterCount = db.prepare("SELECT COUNT(*) AS n FROM chapters").get().n;
if (chapterCount === 0) {
  const insert = db.prepare(`
    INSERT INTO chapters (name, campus, city, state, lat, lon, is_custom)
    VALUES (@name, @campus, @city, @state, @lat, @lon, 0)
  `);
  const insertMany = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  insertMany(SEED_CHAPTERS);
}
