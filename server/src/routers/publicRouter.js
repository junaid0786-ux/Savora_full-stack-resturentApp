import express from "express";

import { newContact } from "../controllers/publicController.js";
import {
  getAllRestaurant,
  getRestaurantDetails,
} from "../controllers/publicController.js";

const router = express.Router();
router.post("/contact", newContact);

router.get("/restaurants", getAllRestaurant);
router.get("/restaurant/:id", getRestaurantDetails);

export default router;
