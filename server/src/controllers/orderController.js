import Order from "../models/OrderModel.js";
import MenuItem from "../models/menuSchema.js";

export const createOrder = async (req, res, next) => {
  try {
    const { restaurantID, items, deliveryAddress, contactNumber } = req.body;

    if (!restaurantID || !items?.length || !deliveryAddress || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required order details",
      });
    }

    let calculatedTotal = 0;
    const processedItems = await Promise.all(
      items.map(async (item) => {
        const menuProduct = await MenuItem.findById(item.menuItemID);
        if (!menuProduct)
          throw new Error(`Menu item ${item.menuItemID} not found`);

        const itemPrice = parseFloat(menuProduct.price);
        calculatedTotal += itemPrice * item.quantity;

        return {
          menuItemID: menuProduct._id,
          itemName: menuProduct.itemName,
          quantity: item.quantity,
          price: itemPrice,
        };
      }),
    );

    const newOrder = await Order.create({
      customerID: req.user.id,
      restaurantID,
      items: processedItems,
      totalAmount: calculatedTotal,
      deliveryAddress,
      contactNumber,
      status: "pending",
    });

    const populatedOrder = await Order.findById(newOrder._id)
      .populate("customerID", "fullName email photo")
      .populate("restaurantID", "restaurantName");

    const io = req.app.get("io");
    if (io) {
      io.to(restaurantID).emit("new_order", populatedOrder);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: populatedOrder,
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid order status" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    ).populate("customerID", "fullName email");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const io = req.app.get("io");
    if (io) {
      io.to(updatedOrder.customerID._id.toString()).emit(
        "order_status_updated",
        {
          orderId: updatedOrder._id,
          status: updatedOrder.status,
          message: `Your order is now ${status}`,
        },
      );
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

    res.status(200).json({ success: true, count });
  } catch (error) {
    next(error);
  }
};

export const getCustomerOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customerID: req.user.id })
      .populate("restaurantID", "restaurantName photo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId)
      .populate("restaurantID", "restaurantName mobileNumber")
      .populate("customerID", "fullName");

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const isCustomer = order.customerID._id.toString() === req.user.id;
    const isRestaurant = order.restaurantID._id.toString() === req.user.id;

    if (!isCustomer && !isRestaurant) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized to view this order" });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};
