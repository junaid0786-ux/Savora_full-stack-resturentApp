import express from "express";
import multer from "multer";

import { ResturentAddMenuItem } from "../controllers/restaurantController.js";
import { restaurantProtect} from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",

  restaurantProtect,
  upload.array("itemImages", 5),
  ResturentAddMenuItem,
);

export default router;
