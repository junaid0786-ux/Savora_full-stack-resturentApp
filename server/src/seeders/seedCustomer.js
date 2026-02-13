import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { DummyCustomerData } from "./dummyUsers.js";

const seedCustomer = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    await connectDB();

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
    process.exit(0)
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};
seedCustomer();
