import Order from "../models/OrderModel.js";  
import MenuItem from "../models/menuSchema.js";

export const createOrder = async (req, res, next) => {
  try {
    const { restaurantID, items, deliveryAddress, contactNumber } = req.body;

    if (
      !restaurantID ||
      !items ||
      items.length === 0 ||
      !deliveryAddress ||
      !contactNumber
    ) {
      const error = new Error("Please provide all required order details");
      error.statusCode = 400;
      return next(error);
    }

    let calculatedTotal = 0;
    const processedItems = [];

    for (const item of items) {
      const menuProduct = await MenuItem.findById(item.menuItemID);

      if (!menuProduct) {
        return res.status(404).json({
          success: false,
          message: `Menu item ${item.itemName} not found`,
        });
      }

      const itemPrice = parseFloat(menuProduct.price);
      calculatedTotal += itemPrice * item.quantity;

      processedItems.push({
        menuItemID: menuProduct._id,
        itemName: menuProduct.itemName,
        quantity: item.quantity,
        price: itemPrice,
      });
    }

    const newOrder = new Order({
      customerID: req.user.id,  
      restaurantID,
      items: processedItems,
      totalAmount: calculatedTotal,
      deliveryAddress,
      contactNumber,
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ restaurantID: req.user.id })
      .populate("customerID", "fullName email mobileNumber photo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "preparing",
      "out-for-delivery",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      const error = new Error("Invalid order status");
      error.statusCode = 400;
      return next(error);
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingNotificationCount = async (req, res, next) => {
  try {
    const count = await Order.countDocuments({
      restaurantID: req.user.id,
      status: "pending",
    });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    next(error);
  }
};
