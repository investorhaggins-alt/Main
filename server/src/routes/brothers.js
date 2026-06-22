import { Router } from "express";
import { db } from "../db.js";
import { AREA_CODES } from "../data/areaCodes.js";

export const brothersRouter = Router();

function deriveAreaCode(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  const tenDigits = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  if (tenDigits.length !== 10) return { areaCode: null, region: null };
  const areaCode = tenDigits.slice(0, 3);
  const match = AREA_CODES[Number(areaCode)];
  return { areaCode, region: match ? match.region : "Unknown area code" };
}

brothersRouter.get("/", (req, res) => {
  const brothers = db.prepare("SELECT * FROM brothers ORDER BY last_name, first_name").all();
  res.json(brothers);
});

brothersRouter.post("/", (req, res) => {
  const { firstName, lastName, phone, chapterId } = req.body;
  if (!firstName || !lastName || !phone || !chapterId) {
    return res.status(400).json({ error: "firstName, lastName, phone, chapterId are required" });
  }
  const chapter = db.prepare("SELECT * FROM chapters WHERE id = ?").get(chapterId);
  if (!chapter) return res.status(400).json({ error: "Unknown chapterId" });

  const { areaCode, region } = deriveAreaCode(phone);

  const result = db
    .prepare(
      `INSERT INTO brothers
        (first_name, last_name, phone, area_code, area_code_region, chapter_id, chapter_name, campus, city, state, lat, lon)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      firstName.trim(),
      lastName.trim(),
      phone.trim(),
      areaCode,
      region,
      chapter.id,
      chapter.name,
      chapter.campus,
      chapter.city,
      chapter.state,
      chapter.lat,
      chapter.lon
    );

  const brother = db.prepare("SELECT * FROM brothers WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(brother);
});

brothersRouter.put("/:id", (req, res) => {
  const { firstName, lastName, phone, chapterId } = req.body;
  const existing = db.prepare("SELECT * FROM brothers WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Brother not found" });

  const chapter = chapterId
    ? db.prepare("SELECT * FROM chapters WHERE id = ?").get(chapterId)
    : db.prepare("SELECT * FROM chapters WHERE id = ?").get(existing.chapter_id);
  if (!chapter) return res.status(400).json({ error: "Unknown chapterId" });

  const nextPhone = phone ?? existing.phone;
  const { areaCode, region } = deriveAreaCode(nextPhone);

  db.prepare(
    `UPDATE brothers SET
      first_name = ?, last_name = ?, phone = ?, area_code = ?, area_code_region = ?,
      chapter_id = ?, chapter_name = ?, campus = ?, city = ?, state = ?, lat = ?, lon = ?
     WHERE id = ?`
  ).run(
    firstName ?? existing.first_name,
    lastName ?? existing.last_name,
    nextPhone,
    areaCode,
    region,
    chapter.id,
    chapter.name,
    chapter.campus,
    chapter.city,
    chapter.state,
    chapter.lat,
    chapter.lon,
    req.params.id
  );

  const updated = db.prepare("SELECT * FROM brothers WHERE id = ?").get(req.params.id);
  res.json(updated);
});

brothersRouter.delete("/:id", (req, res) => {
  const result = db.prepare("DELETE FROM brothers WHERE id = ?").run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: "Brother not found" });
  res.status(204).end();
});
