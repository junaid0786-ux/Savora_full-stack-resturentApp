import React, { useState } from "react";
import MenuImage from "../../assets/menu1.jpg";
import MenuImage2 from "../../assets/menu2.jpg";
import MenuImage3 from "../../assets/menu3.jpg";
import MenuImage4 from "../../assets/menu4.jpg";
import MenuImage5 from "../../assets/menu5.jpg";
import AddItemModal from "../resturantModals/AddItemModal";

import {
  Search,
  Plus,
  Filter,
  Edit3,
  Trash2,
  MoreVertical,
  ImageOff,
  ChevronDown,
} from "lucide-react";

const RestaurantMenu = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [menuItems, setMenuItems] = useState([
    {
      _id: "1",
      name: "Tandoori Chicken Platter",
      description: "Whole chicken marinated in yogurt and spices.",
      price: 450,
      category: "Main Course",
      cuisine: "North Indian",
      type: "non-veg",
      servingSize: "Serves 2",
      availability: true,
      image: [{ url: MenuImage4, publicID: "124" }],
    },
    {
      _id: "2",
      name: "Paneer Butter Masala",
      description: "Rich and creamy curry made with paneer and butter.",
      price: 280,
      category: "Main Course",
      cuisine: "North Indian",
      type: "veg",
      servingSize: "Serves 2",
      availability: true,
      image: [{ url: MenuImage3, publicID: "124" }],
    },
    {
      _id: "3",
      name: "Avocado Toast",
      description: "Toasted sourdough bread topped with smashed avocado.",
      price: 320,
      category: "Breakfast",
      cuisine: "Continental",
      type: "vegan",
      servingSize: "Serves 1",
      availability: false,
      image: [{ url: MenuImage5, publicID: "125" }],
    },
    {
      _id: "4",
      name: "Chocolate Brownie",
      description: "Fudgy dark chocolate brownie topped with walnuts.",
      price: 150,
      category: "Dessert",
      cuisine: "American",
      type: "dessert",
      servingSize: "1 pc",
      availability: true,
      image: [{ url: MenuImage2, publicID: "126" }],
    },
    {
      _id: "5",
      name: "Spicy Szechuan Noodles",
      description: "Stir-fried noodles with spicy szechuan sauce.",
      price: 220,
      category: "Main Course",
      cuisine: "Chinese",
      type: "spicy",
      servingSize: "Serves 1",
      availability: true,
      image: [{ url: MenuImage, publicID: "127" }],
    },
  ]);

  const categories = [
    "All",
    ...new Set(menuItems.map((item) => item.category)),
  ];
  const dietaryTypes = [
    "All",
    "veg",
    "non-veg",
    "vegan",
    "spicy",
    "dessert",
    "beverage",
  ];

  const toggleAvailability = (id) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, availability: !item.availability } : item,
      ),
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this item?")) {
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
    }
  };

  const handleSaveNewItem = (formData) => {
    const newItem = {
      _id: Date.now().toString(),
      ...formData,
      image: formData.image
        ? [{ url: URL.createObjectURL(formData.image), publicID: "temp" }]
        : [],
    };
    setMenuItems([newItem, ...menuItems]);
  };

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeColor = (type) => {
    const colors = {
      veg: "bg-green-100 text-green-700 border-green-200",
      vegan: "bg-green-50 text-green-600 border-green-200",
      "non-veg": "bg-red-100 text-red-700 border-red-200",
      spicy: "bg-orange-100 text-orange-700 border-orange-200",
      dessert: "bg-pink-100 text-pink-700 border-pink-200",
      beverage: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-outfit">
            Menu Items
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your restaurant's food catalog
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-95 transform-gpu font-medium"
        >
          <Plus size={20} /> Add New Item
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96 group">
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-100 transition-all text-sm"
          />
          <Search
            className="absolute left-3.5 top-2.5 text-gray-400 group-focus-within:text-rose-500"
            size={18}
          />
        </div>

        <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-hide">
          <div className="relative min-w-35">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 font-medium focus:outline-none focus:border-rose-300 cursor-pointer hover:bg-gray-50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>

          <div className="relative min-w-35">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 font-medium focus:outline-none focus:border-rose-300 cursor-pointer hover:bg-gray-50"
            >
              {dietaryTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All"
                    ? "All Types"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-3 top-2.5 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <Search size={32} className="text-gray-300 mb-3" />
          <h3 className="text-gray-500 font-medium">No items found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="h-40 w-full relative overflow-hidden bg-gray-100">
                {item.image && item.image.length > 0 ? (
                  <img
                    src={item.image[0].url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 flex-col gap-2">
                    <ImageOff size={24} />
                    <span className="text-[10px] font-medium">No Image</span>
                  </div>
                )}
                <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-gray-800 shadow-sm">
                  ₹{item.price}
                </div>
                <div
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm backdrop-blur-sm ${item.availability ? "bg-green-500/90 text-white" : "bg-gray-800/80 text-white"}`}
                >
                  {item.availability ? "Stock" : "Out"}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-base text-gray-800 font-outfit leading-tight group-hover:text-rose-600 transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {item.category}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <p className="text-gray-500 text-xs line-clamp-2 mb-3 flex-1">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${getTypeColor(item.type)}`}
                  >
                    {item.type}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-gray-100 text-gray-600 border border-gray-200">
                    {item.servingSize}
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => toggleAvailability(item._id)}
                  >
                    <div
                      className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${item.availability ? "bg-green-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform duration-300 shadow-sm ${item.availability ? "left-4.5" : "left-0.5"}`}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveNewItem}
      />
    </div>
  );
};

export default RestaurantMenu;
