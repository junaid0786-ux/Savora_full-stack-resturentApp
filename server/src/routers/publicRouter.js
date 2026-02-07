import express from "express";

import { newContact } from "../controllers/publicController.js";
import { getAllRestaurant } from "../controllers/publicController.js";

const router = express.Router();
router.post("/contact", newContact);

router.get("/restaurants", getAllRestaurant)

export default router;
