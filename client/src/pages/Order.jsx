import React, { useState, useEffect, useRef } from "react";
import api from "../config/Api";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Filter,
  UtensilsCrossed,
  ChevronDown,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await api.get("/public/restaurants");
        if (data.success) {
          setRestaurants(data.data);
          setFilteredRestaurants(data.data);
        }
      } catch (error) {
        toast.error("Could not load restaurants");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let result = restaurants;

    if (searchQuery) {
      result = result.filter((rest) =>
        rest.restaurantName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCuisine !== "All") {
      result = result.filter((rest) =>
        rest.cuisine?.toLowerCase().includes(selectedCuisine.toLowerCase()),
      );
    }

    setFilteredRestaurants(result);
  }, [searchQuery, selectedCuisine, restaurants]);

  const allCuisines = [
    "All",
    ...new Set(restaurants.map((r) => r.cuisine).filter(Boolean)),
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-24 animate-fade-in">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm/50 backdrop-blur-xl ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="w-full md:w-auto text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 font-brand flex items-center justify-center md:justify-start gap-2">
                Order Food Online{" "}
                <span className="text-rose-500 text-3xl">.</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                <span className="font-bold text-gray-900">
                  {restaurants.length}
                </span>{" "}
                restaurants active nearby
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative group w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search for restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border border-transparent rounded-xl text-sm font-semibold text-gray-800 placeholder-gray-400 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all"
                />
                <Search
                  className="absolute left-4 top-2.5 text-gray-400 group-focus-within:text-rose-500 transition-colors"
                  size={18}
                />
              </div>

              <div className="relative w-full sm:w-48" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border rounded-xl text-sm font-bold transition-all ${
                    isDropdownOpen
                      ? "border-rose-500 ring-4 ring-rose-500/10 text-gray-900"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Filter
                      size={16}
                      className={
                        selectedCuisine !== "All"
                          ? "text-rose-500"
                          : "text-gray-400"
                      }
                    />
                    {selectedCuisine === "All"
                      ? "Filter Cuisine"
                      : selectedCuisine}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl shadow-gray-200/50 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-1.5">
                      {allCuisines.map((cuisine) => (
                        <button
                          key={cuisine}
                          onClick={() => {
                            setSelectedCuisine(cuisine);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCuisine === cuisine
                              ? "bg-rose-50 text-rose-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {cuisine}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="flex flex-col gap-3">
                <div className="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center opacity-0 animate-fade-in fill-mode-forwards">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <UtensilsCrossed size={48} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 font-brand">
              No restaurants found
            </h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              We couldn't find any matches for "{searchQuery}". Try browsing all
              cuisines.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCuisine("All");
              }}
              className="mt-6 text-rose-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id}
                  data={restaurant}
                  navigate={navigate}
                />
              ))}
            </div>

            <div className="mt-16 text-center border-t border-gray-200 pt-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                End of results
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const RestaurantCard = ({ data, navigate }) => {
  const isOpen = data.isActive === "active";

  return (
    <div
      onClick={() => navigate(`/restaurant/${data._id}`)}
      className="group flex flex-col h-full bg-transparent cursor-pointer"
    >
      <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl group-hover:shadow-gray-200/50 transition-all duration-300">
        <img
          src={data.photo?.url || data.restaurantName}
          alt={data.restaurantName}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${!isOpen && "grayscale"}`}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {!isOpen && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-black/70 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-white/20">
              Currently Closed
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-rose-600 transition-colors line-clamp-1 font-brand">
            {data.restaurantName}
          </h3>
          <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded-md shadow-sm shrink-0">
            <span className="text-[10px] font-bold">
              {data.rating || "4.2"}
            </span>
            <Star size={8} fill="currentColor" />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 font-medium mb-3">
          <span className="truncate pr-2">
            {data.cuisine || "Multi-cuisine"}
          </span>
          <span className="shrink-0 text-gray-400 text-xs">
            {data.costForTwo ? `₹${data.costForTwo} for two` : "₹300 for two"}
          </span>
        </div>

        <div className="mt-auto pt-3 border-t border-dashed border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
          <div className="flex items-center gap-1.5">
            <Clock
              size={12}
              className={isOpen ? "text-green-600" : "text-gray-400"}
            />
            <span>{data.deliveryTime || "30-40 min"}</span>
          </div>
          <div className="flex items-center gap-1.5 max-w-[50%]">
            <MapPin size={12} />
            <span className="truncate">{data.city || "Nearby"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
