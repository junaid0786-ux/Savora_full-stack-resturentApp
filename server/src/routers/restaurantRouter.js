import express from "express";
import multer from "multer";
import { authUser, restaurantProtect } from "../middlewares/authMiddleware.js";
import {
  RestaurantAddMenuItem,
  GetRestaurantMenuItem,
  RestaurantEditMenuItem,
  RestaurantDeleteMenuItem,
  ToggleMenuItemAvailability,
} from "../controllers/restaurantController.js";

const router = express.Router();
const upload = multer();

router.post(
  "/addMenuItem",
  authUser,
  restaurantProtect,
  upload.array("itemImages", 5),
  RestaurantAddMenuItem,
);

router.get("/menuItems", authUser, restaurantProtect, GetRestaurantMenuItem);

router.put(
  "/editMenuItem/:id",
  authUser,
  restaurantProtect,
  upload.array("itemImages", 5),
  RestaurantEditMenuItem,
);

router.delete(
  "/deleteMenuItem/:id",
  authUser,
  restaurantProtect,
  RestaurantDeleteMenuItem,
);

router.patch(
  "/toggle-availability/:id",
  authUser,
  restaurantProtect,
  ToggleMenuItemAvailability,
);

export default router;
