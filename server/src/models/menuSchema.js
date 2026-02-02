import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
  resturentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  cuisine: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    enum: [
      "veg",
      "non-veg",
      "vegan",
      "egg",
      "gluten-free",
      "contains-nuts",
      "spicy",
      "sweet",
      "dessert",
      "dairy",
      "beverage",
    ],
    required: true,
  },
  servingSize: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },

  image: {
    type: [
      {
        url: { type: String, required: true },
        publicID: { type: String, required: true },
      },
    ],
    default: null,
  },
});
const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
