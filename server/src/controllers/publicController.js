import Contact from "../models/ContactModel.js";
import User from "../models/userModel.js";

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
