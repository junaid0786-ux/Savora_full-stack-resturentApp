import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { DummyAdminData } from "./dummy.js";

const seedAdmin = async () => {
  try {
    await connectDB();
    const salt = await bcrypt.genSalt(10);

    for (const admin of DummyAdminData) {
      const hashedPassword = await bcrypt.hash(admin.password, salt);

      const existingAdmin = await User.findOne({ email: admin.email });

      if (existingAdmin) {
        if (existingAdmin.role === "admin") {
          await existingAdmin.deleteOne();
          console.log("Old Admin Removed");
        } else {
          console.log(
            `Email ${admin.email} already registered as other user type`,
          );
          continue;
        }
      }
      console.log("Adding New Admin User");

      const AdminUser = await User.create({
        ...admin,
        password: hashedPassword,
      });

      console.log("Admin User Added Successfully:", AdminUser);
    }
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
  process.exit(0);
};

seedAdmin();
