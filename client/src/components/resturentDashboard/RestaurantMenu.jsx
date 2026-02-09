import React, { useState, useEffect, useMemo } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import AddItemModal from "../../components/resturantModals/AddItemModal";
import EditMenuItemModal from "../../components/resturantModals/EditMenuItemModal";
import {
  Search,
  Plus,
  Filter,
  Trash2,
  ImageOff,
  ChevronDown,
  Loader2,
  Edit3,
  UtensilsCrossed,
  XCircle,
} from "lucide-react";

const RestaurantMenu = () => {
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const fetchMenuItem = async () => {
    setLoading(true);
    try {
      const res = await api.get("/restaurant/menuItems");
      if (res.data?.data) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItem();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item? This cannot be undone.",
      )
    ) {
      try {
        const response = await api.delete(`/restaurant/deleteMenuItem/${id}`);
        if (response.status === 200) {
          toast.success("Item deleted successfully");
          setMenuItems((prev) => prev.filter((item) => item._id !== id));
        }
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  const handleToggleAvailability = async (item) => {
    const newStatus =item.availability === "available" ? "unavailable" : "available";
    setMenuItems((prev) =>
      prev.map((i) =>
        i._id === item._id ? { ...i, availability: newStatus } : i,
      ),
    );

    try {
      await api.patch(`/restaurant/toggle-availability/${item._id}`, {
        status: newStatus,
      });
      toast.success(`Item marked as ${newStatus}`);
    } catch (error) {
      toast.error("Failed to update status");
      fetchMenuItem();
    }
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditItemModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedType("All");
  };

  const categories = useMemo(() => {
    const cats = new Set(
      (menuItems || []).map((item) => item.category || item.cuisine || "Other"),
    );
    return ["All", ...Array.from(cats).sort()];
  }, [menuItems]);

  const dietaryTypes = [
    "All",
    "veg",
    "non-veg",
    "vegan",
    "egg",
    "gluten-free",
    "spicy",
    "dessert",
    "beverage",
  ];

  const filteredItems = useMemo(() => {
    return (menuItems || []).filter((item) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        (item.itemName || "").toLowerCase().includes(query) ||
        (item.description || "").toLowerCase().includes(query);

      const itemCategory = item.category || item.cuisine || "Other";
      const matchesCategory =
        selectedCategory === "All" || itemCategory === selectedCategory;

      const matchesType = selectedType === "All" || item.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [menuItems, searchQuery, selectedCategory, selectedType]);

  const getTypeColor = (type) => {
    const colors = {
      veg: "bg-green-100 text-green-700 border-green-200",
      vegan: "bg-green-50 text-green-600 border-green-200",
      "non-veg": "bg-red-100 text-red-700 border-red-200",
      egg: "bg-yellow-100 text-yellow-700 border-yellow-200",
      "gluten-free": "bg-teal-100 text-teal-700 border-teal-200",
      spicy: "bg-orange-100 text-orange-700 border-orange-200",
      dessert: "bg-purple-100 text-purple-700 border-purple-200",
      beverage: "bg-blue-100 text-blue-700 border-blue-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-outfit">
            Menu Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage, edit, and organize your food catalog
          </p>
        </div>
        <button
          onClick={() => setIsAddItemModalOpen(true)}
          className="flex items-center gap-2 bg-rose-600 text-white px-5 py-2.5 rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 active:scale-95 transform-gpu font-medium group"
        >
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform duration-300"
          />
          Add New Item
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:w-96 group">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-4 focus:ring-rose-50 transition-all text-sm"
          />
          <Search
            className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-rose-500 transition-colors"
            size={18}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <XCircle size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
          <div className="relative min-w-40 flex-1 lg:flex-none">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 font-medium focus:outline-none focus:border-rose-300 cursor-pointer hover:bg-gray-50"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>

          <div className="relative min-w-40 flex-1 lg:flex-none">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 font-medium focus:outline-none focus:border-rose-300 cursor-pointer hover:bg-gray-50"
            >
              {dietaryTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All"
                    ? "All Diets"
                    : type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
              size={16}
            />
          </div>

          {(selectedCategory !== "All" ||
            selectedType !== "All" ||
            searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-xs font-bold text-rose-500 hover:text-rose-700 hover:underline px-2"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden min-h-100">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-100">
            <Loader2 className="animate-spin text-rose-500 mb-3" size={40} />
            <p className="text-gray-500 font-medium animate-pulse">
              Fetching your menu...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-100 text-center p-6">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <UtensilsCrossed size={40} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-700">No items found</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your search or filters to find what you're looking for."
                : "Your menu is empty. Start adding delicious items!"}
            </p>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={clearFilters}
                className="mt-4 text-rose-600 font-bold text-sm hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/80 backdrop-blur-sm sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    S.No
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Item Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredItems.map((item, idx) => (
                  <tr
                    key={item._id || idx}
                    className="hover:bg-gray-50/60 transition-colors group"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-medium w-10">
                      {idx + 1}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center min-w-50">
                        <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative">
                          {item.images &&
                          item.images.length > 0 &&
                          item.images[0].url ? (
                            <img
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              src={item.images[0].url}
                              alt={item.itemName}
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <ImageOff size={18} />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-800 font-outfit line-clamp-1">
                            {item.itemName}
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {item.cuisine} • {item.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.category || "Main Course"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-lg border uppercase tracking-wide ${getTypeColor(item.type)}`}
                      >
                        {item.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        ₹{item.price}
                      </div>
                      <div className="text-[10px] text-gray-500">
                        {item.servingSize}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          item.availability === "available"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            item.availability === "available"
                              ? "translate-x-5"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                      <span className="ml-2 text-xs font-medium text-gray-500">
                        {item.availability === "available" ? "On" : "Off"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                          title="Edit Item"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
                          title="Delete Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddItemModal
        isOpen={isAddItemModalOpen}
        onClose={() => setIsAddItemModalOpen(false)}
        onSave={(newItem) => {
          fetchMenuItem();
        }}
      />

      {isEditItemModalOpen && selectedItem && (
        <EditMenuItemModal
          selectedItem={selectedItem}
          onClose={() => setIsEditItemModalOpen(false)}
          onUpdate={fetchMenuItem}
        />
      )}
    </div>
  );
};

export default RestaurantMenu;
