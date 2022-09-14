import express from "express";
import { getMasterSkills } from "../controllers/masterControllers.js";
let router = express.Router();

router.get("/get/skills/master", getMasterSkills);
export default router;
