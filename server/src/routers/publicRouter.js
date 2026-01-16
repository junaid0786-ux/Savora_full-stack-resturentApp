import express from "express";

import { newContact } from "../controllers/publicController.js";

const router = express.Router();
router.post("/contact", newContact);

export default router;
