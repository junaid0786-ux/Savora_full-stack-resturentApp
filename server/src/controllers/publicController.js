import Contact from "../models/ContactModel.js";
import User from "../models/userModel.js";
import MenuItem from "../models/menuSchema.js";

export const newContact = async (req, res, next) => {
  try {
    const { fullName, email, number, message } = req.body;

    if (!fullName || !email || !number || !message) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      return next(error);
    }

    const NewContact = new Contact({
      fullName,
      email,
      number,
      message,
    });

    await NewContact.save();
    console.log("Data successfully saved:", NewContact);

    res.status(201).json({ message: "Thanks for contacting us" });
  } catch (error) {
    next(error);
  }
};

export const getAllRestaurant = async (req, res, next) => {
  try {
    const restaurants = await User.find({ role: "manager" });

    res.status(200).json({
      success: true,
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

export const getRestaurantDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await User.findById(id).select(
      "-password -paymentDetails -documents",
    );

    if (!restaurant) {
      return res
        .status(404)
        .json({ success: false, message: "Restaurant not found" });
    }

    const menuItems = await MenuItem.find({
      resturantID: id,
      availability: "available",
    });

    res.status(200).json({
      success: true,
      data: {
        profile: restaurant,
        menu: menuItems,
      },
    });
  } catch (error) {
    next(error);
  }
};
