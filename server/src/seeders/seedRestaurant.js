import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { DummyRestaurantData } from "./dummyUsers.js";

const seedRestaurant = async () => {
  try {
    await connectDB();
    const salt = await bcrypt.genSalt(10);

    for (const restaurant of DummyRestaurantData) {
      const existingRestaurant = await User.findOne({
        email: restaurant.email,
      });

      if (existingRestaurant) {
        if (existingRestaurant.role === "manager") {
          await existingRestaurant.deleteOne();
          console.log("Old Restaurant Manager Removed");
        } else {
          console.log("Email Already registered as other user type ");
          continue;
        }
      }

      const newRestaurant = await User.create({
        ...restaurant,
        password: await bcrypt.hash(restaurant.password, salt),
      });
      console.log("New Restaureant Manager Added:", newRestaurant.email);
    }
    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedRestaurant();
