import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
  DummyCustomerData,
  DummyRestaurantData,
  DummyPartnerData,
} from "./dummy.js";

const seedUser = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    await connectDB();

    for (const partner of DummyPartnerData) {
      const existingPartner = await User.findOne({
        email: partner.email,
      });
      if (existingPartner) {
        if (existingPartner.role === "partner") {
          await existingPartner.deleteOne();
          console.log("Old Partner Removed");
        } else {
          console.log("Email Already registered as other user type");
        }
      }

      const newPartner = await User.create({
        ...partner,
        password: await bcrypt.hash(partner.password, salt),
      });
      console.log("New Partner Added:", newPartner.email);
    }

    for (const customer of DummyCustomerData) {
      const existingCustomer = await User.findOne({
        email: customer.email,
      });
      if (existingCustomer) {
        if (existingCustomer.role === "customer") {
          await existingCustomer.deleteOne();
          console.log("Old Customer Removed");
        } else {
          console.log("Email Already registered as other user type");
        }
      }

      const newCustomer = await User.create({
        ...customer,
        password: await bcrypt.hash(customer.password, salt),
      });
      console.log("New Customer Added:", newCustomer.email);
    }

    for (const restaurant of DummyRestaurantData) {
      const existingRestaurant = await User.findOne({
        email: restaurant.email,
      });
      if (existingRestaurant) {
        if (existingRestaurant.role === "manager") {
          await existingRestaurant.deleteOne();
          console.log("Old Restaurant Manager Removed");
        } else {
          console.log("Email Already registered as other user type");
        }
      }
      const newRestaurant = await User.create({
        ...restaurant,
        password: await bcrypt.hash(restaurant.password, salt),
      });
      console.log("New Restaurant Manager Added:", newRestaurant.email);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};

seedUser();
