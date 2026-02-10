import express from "express";
import { authUser, restaurantProtect } from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getRestaurantOrders,
  updateOrderStatus,
  getPendingNotificationCount,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", authUser, createOrder);

router.get(
  "/restaurant-orders",
  authUser,
  restaurantProtect,
  getRestaurantOrders,
);

router.get(
  "/notification-count",
  authUser,
  restaurantProtect,
  getPendingNotificationCount,
);

router.patch(
  "/update-status/:orderId",
  authUser,
  restaurantProtect,
  updateOrderStatus,
);

export default router;
