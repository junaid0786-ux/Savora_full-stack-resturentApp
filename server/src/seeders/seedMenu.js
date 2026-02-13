import dotenv from "dotenv";
dotenv.config();
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import Menu from "../models/menuSchema.js";
import { DummyMenuItems } from "./dummyMenu.js";

const seedMenu = async () => {
  try {
    await connectDB();
    console.log("Starting Menu Seeding...");

    const managers = await User.find({ role: "manager", isActive: "active" });

    if (managers.length === 0) {
      console.log("No active restaurant managers found. Seed Users first.");
      process.exit(1);
    }

    console.log(`Found ${managers.length} Restaurants. Adding menus...`);

    for (const manager of managers) {
      await Menu.deleteMany({ resturantID: manager._id });

      const menuItemsWithId = DummyMenuItems.map((item) => ({
        ...item,
        resturantID: manager._id,
      }));

      await Menu.insertMany(menuItemsWithId);
      console.log(
        `Added 10 items for: ${manager.restaurantName || manager.email}`,
      );
    }

    console.log("--- Menu Seeding Completed Successfully ---");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding menu:", error);
    process.exit(1);
  }
};

seedMenu();
