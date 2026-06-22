import { Router } from "express";
import { AREA_CODES } from "../data/areaCodes.js";

export const areaCodesRouter = Router();

areaCodesRouter.get("/", (req, res) => {
  res.json(AREA_CODES);
});
