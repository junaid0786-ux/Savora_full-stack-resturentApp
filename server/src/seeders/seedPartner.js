import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import { DummyPartnerData } from "./dummyUsers";

const seedPartner = async () => {
  try {
    const salt = bcrypt.genSalt(10);
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
  } catch (error) {
    console.error("Error seeding users:", error);
    process.exit(1);
  }
};
seedPartner();
