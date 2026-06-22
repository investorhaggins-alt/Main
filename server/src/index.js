import express from "express";
import cors from "cors";
import "./db.js";
import { chaptersRouter } from "./routes/chapters.js";
import { areaCodesRouter } from "./routes/areacodes.js";
import { brothersRouter } from "./routes/brothers.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chapters", chaptersRouter);
app.use("/api/areacodes", areaCodesRouter);
app.use("/api/brothers", brothersRouter);

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Que Tracker API listening on http://localhost:${PORT}`);
});
