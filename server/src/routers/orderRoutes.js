import express from "express";
import {
  authUser,
  restaurantProtect,
  customerProtect,
} from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getRestaurantOrders,
  updateOrderStatus,
  getPendingNotificationCount,
  getCustomerOrders,
  getOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", authUser, customerProtect, createOrder);

router.get("/my-orders", authUser, customerProtect, getCustomerOrders);

router.get("/track/:orderId", authUser, getOrderById);

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
