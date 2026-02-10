import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/Api";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import {
  Star,
  MapPin,
  Clock,
  Search,
  ChevronLeft,
  Heart,
  Share2,
  Loader2,
  ShoppingBag,
  Plus,
  Minus,
  Filter,
  ChevronDown,
  Flame,
  Leaf,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems, getCartTotal, getCartCount } =
    useCart();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  const [activeDropdown, setActiveDropdown] = useState(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/public/restaurant/${id}`);
        if (data.success) {
          setRestaurant(data.data.profile);
          setMenuItems(data.data.menu || []);
        }
      } catch (error) {
        toast.error("Restaurant not found");
        navigate("/order");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();

    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [id, navigate]);

  const availableCuisines = useMemo(() => {
    const list = new Set(menuItems.map((item) => item.cuisine).filter(Boolean));
    return ["All", ...Array.from(list)];
  }, [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchSearch = item.itemName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchVeg = isVegOnly
        ? item.type === "veg" || item.type === "vegan"
        : true;
      const matchCuisine =
        selectedCuisine === "All" || item.cuisine === selectedCuisine;
      const matchType = selectedType === "All" || item.type === selectedType;
      return matchSearch && matchVeg && matchCuisine && matchType;
    });
  }, [menuItems, searchQuery, isVegOnly, selectedCuisine, selectedType]);

  const groupedMenu = useMemo(() => {
    const grouped = {};
    filteredItems.forEach((item) => {
      const key = item.category || item.cuisine || "Menu";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(item);
    });
    return grouped;
  }, [filteredItems]);

  const menuSections = Object.keys(groupedMenu);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-(--bg-main)">
        <Loader2 className="animate-spin text-rose-600" size={40} />
      </div>
    );

  if (!restaurant) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-(family-name:--font-poppins) flex flex-col">
      <header className="relative h-80 w-full bg-gray-900 group overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={
              restaurant.heroImage ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop"
            }
            alt="Cover"
            className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>

        <div className="absolute top-0 w-full p-4 md:p-6 flex justify-between items-start z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 border border-white/10"
          >
            <ChevronLeft size={22} />
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 border border-white/10">
              <Heart size={20} />
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 border border-white/10">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 w-full px-4 md:px-8 pb-6 z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-end gap-6">
            <div className="hidden md:block w-36 h-36 rounded-2xl bg-white p-1.5 shadow-2xl relative -mb-10 shrink-0 border border-gray-100 z-20">
              <img
                src={
                  restaurant.photo?.url ||
                  "https://ui-avatars.com/api/?name=" +
                    restaurant.restaurantName
                }
                className="w-full h-full object-cover rounded-xl"
                alt="Logo"
              />
            </div>

            <div className="flex-1 text-white pb-1">
              <h1 className="text-3xl md:text-6xl font-black font-brand tracking-tight mb-2 shadow-sm drop-shadow-lg">
                {restaurant.restaurantName}
              </h1>
              <p className="text-gray-300 text-sm md:text-lg font-medium mb-3 flex items-center gap-2">
                {restaurant.cuisine}{" "}
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>{" "}
                {restaurant.city}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-bold text-xs bg-green-600 shadow-lg backdrop-blur-md">
                  <Star size={14} fill="currentColor" /> 4.2
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-bold text-xs bg-white/20 border border-white/10 backdrop-blur-md">
                  <Clock size={14} /> {restaurant.deliveryTime || 30} mins
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5">
          <div
            className="flex flex-col md:flex-row gap-3 items-center"
            ref={filterRef}
          >
            <div className="relative w-full md:flex-1 group">
              <Search
                className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-rose-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 border border-transparent pl-10 pr-10 py-2.5 rounded-xl text-sm font-semibold text-gray-700 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 w-full md:w-auto relative">
              <div
                onClick={() => setIsVegOnly(!isVegOnly)}
                className={`
                       flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer border transition-all select-none shrink-0 
                       ${isVegOnly ? "bg-green-50 border-green-500 text-green-700 shadow-sm" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"}
                    `}
              >
                <Leaf
                  size={14}
                  className={isVegOnly ? "fill-green-600 text-green-600" : ""}
                />
                <span className="text-xs font-bold whitespace-nowrap">
                  Veg Only
                </span>
              </div>

              <div className="relative shrink-0">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "cuisine" ? null : "cuisine",
                    )
                  }
                  className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all ${selectedCuisine !== "All" ? "border-rose-500 text-rose-600 bg-rose-50" : "border-gray-200"}`}
                >
                  <span>
                    {selectedCuisine === "All" ? "Cuisines" : selectedCuisine}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${activeDropdown === "cuisine" ? "rotate-180" : ""}`}
                  />
                </button>
                {activeDropdown === "cuisine" && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-100 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in zoom-in-95">
                    {availableCuisines.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setSelectedCuisine(c);
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-gray-50 border-b border-gray-50 last:border-none ${selectedCuisine === c ? "text-rose-600 font-bold bg-rose-50" : "text-gray-600"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative shrink-0">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "type" ? null : "type")
                  }
                  className={`flex items-center gap-2 px-4 py-2.5 bg-white border rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all ${selectedType !== "All" ? "border-rose-500 text-rose-600 bg-rose-50" : "border-gray-200"}`}
                >
                  <Filter size={14} />
                  <span className="capitalize">
                    {selectedType === "All" ? "Filter" : selectedType}
                  </span>
                </button>
                {activeDropdown === "type" && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl z-100 overflow-hidden animate-in fade-in zoom-in-95">
                    {["All", "veg", "non-veg", "egg", "vegan"].map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setSelectedType(t);
                          setActiveDropdown(null);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium capitalize hover:bg-gray-50 border-b border-gray-50 last:border-none ${selectedType === t ? "text-rose-600 font-bold bg-rose-50" : "text-gray-600"}`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="grow max-w-6xl mx-auto px-4 md:px-8 py-8 w-full space-y-12 pb-32">
        {menuSections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-60">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Search size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No items found</h3>
            <p className="text-sm text-gray-500 mb-6">
              Matches not found for "{searchQuery}" with current filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setIsVegOnly(false);
                setSelectedCuisine("All");
                setSelectedType("All");
              }}
              className="text-rose-600 font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          menuSections.map((section) => (
            <div key={section} id={section}>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl font-black text-gray-800 font-brand">
                  {section}
                </h2>
                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full border border-gray-200">
                  {groupedMenu[section].length}
                </span>
                <div className="h-px bg-gray-200 flex-1"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {groupedMenu[section].map((item) => (
                  <MenuItemCard
                    key={item._id}
                    item={item}
                    cartItems={cartItems}
                    addToCart={() => addToCart(item, restaurant)}
                    removeFromCart={() => removeFromCart(item._id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </main>

      {cartItems.length > 0 && (
        <div className="fixed bottom-6 left-4 right-4 max-w-3xl mx-auto z-90 animate-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-gray-900 text-white p-4 rounded-2xl shadow-2xl shadow-rose-900/30 flex justify-between items-center hover:scale-[1.01] transition-transform group border border-white/10"
          >
            <div className="flex flex-col items-start pl-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                {getCartCount()} ITEMS ADDED
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black font-brand">
                  ₹{getCartTotal()}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  + taxes
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm group-hover:bg-rose-50 group-hover:text-rose-600 transition-colors shadow-lg">
              View Cart <ShoppingBag size={18} strokeWidth={2.5} />
            </div>
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

const MenuItemCard = ({ item, cartItems, addToCart, removeFromCart }) => {
  const cartItem = cartItems.find((c) => c._id === item._id);
  const qty = cartItem ? cartItem.qty : 0;
  const isAvailable = item.availability === "available";

  const getTypeStyle = (type) => {
    if (["veg", "vegan"].includes(type))
      return {
        color: "text-green-600",
        border: "border-green-600",
        bg: "bg-green-600",
      };
    if (["egg"].includes(type))
      return {
        color: "text-yellow-500",
        border: "border-yellow-500",
        bg: "bg-yellow-500",
      };
    return {
      color: "text-red-600",
      border: "border-red-600",
      bg: "bg-red-600",
    };
  };

  const typeStyle = getTypeStyle(item.type);

  return (
    <div className="bg-white p-4 rounded-3xl border border-gray-100 hover:border-rose-100 hover:shadow-xl hover:shadow-rose-100/30 transition-all duration-300 flex justify-between gap-4 group h-full">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`border ${typeStyle.border} p-0.5 rounded-sm flex items-center justify-center`}
            >
              <div className={`w-2 h-2 rounded-full ${typeStyle.bg}`}></div>
            </div>
            {item.type === "bestseller" && (
              <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Flame size={10} fill="currentColor" /> BESTSELLER
              </span>
            )}
          </div>

          <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 font-brand group-hover:text-rose-600 transition-colors">
            {item.itemName}
          </h3>
          <span className="font-bold text-gray-700 text-sm">₹{item.price}</span>
        </div>

        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mt-2 pr-2">
          {item.description}
        </p>
      </div>

      <div className="relative w-32 shrink-0 flex flex-col items-center">
        <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-50 shadow-inner">
          <img
            src={item.images?.[0]?.url || "https://placehold.co/150"}
            alt={item.itemName}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${!isAvailable && "grayscale opacity-60"}`}
          />
        </div>

        <div
          className={`absolute -bottom-3 w-24 h-9 bg-white rounded-lg shadow-lg border border-gray-100 flex items-center justify-center overflow-hidden transition-all z-10 ${!isAvailable ? "opacity-75" : ""} ${qty > 0 ? "border-rose-100" : ""}`}
        >
          {!isAvailable ? (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              Sold Out
            </span>
          ) : qty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart();
              }}
              className="w-full h-full text-rose-600 font-extrabold text-sm uppercase hover:bg-rose-50 transition-colors"
            >
              ADD
            </button>
          ) : (
            <div className="flex w-full h-full items-center justify-between px-1">
              <button
                onClick={removeFromCart}
                className="w-8 h-full flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Minus size={14} strokeWidth={3} />
              </button>
              <span className="font-bold text-gray-900 text-sm">{qty}</span>
              <button
                onClick={addToCart}
                className="w-8 h-full flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Plus size={14} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
