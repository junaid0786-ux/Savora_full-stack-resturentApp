import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/Api";
import Footer from "../components/Footer";
import {
  Search,
  Star,
  Clock,
  Filter,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  TrendingUp,
  DollarSign,
  UtensilsCrossed,
  Check,
} from "lucide-react";
import toast from "react-hot-toast";

const Order = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [sortBy, setSortBy] = useState("relevant");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await api.get("/public/restaurants");
        if (data.success) {
          setRestaurants(data.data);
        }
      } catch (error) {
        toast.error("Could not load restaurants");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const filteredRestaurants = useMemo(() => {
    let result = [...restaurants];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          (r.title || r.restaurantName)?.toLowerCase().includes(query) ||
          (Array.isArray(r.cuisine)
            ? r.cuisine.join(" ").toLowerCase()
            : r.cuisine?.toLowerCase()
          )?.includes(query),
      );
    }

    if (selectedCuisine !== "All") {
      result = result.filter((r) => {
        if (Array.isArray(r.cuisine)) {
          return r.cuisine.includes(selectedCuisine);
        }
        return r.cuisine === selectedCuisine;
      });
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "time":
        result.sort((a, b) => (a.deliveryTime || 0) - (b.deliveryTime || 0));
        break;
      case "cost_low":
        result.sort(
          (a, b) =>
            (a.priceForTwo || a.costForTwo || 0) -
            (b.priceForTwo || b.costForTwo || 0),
        );
        break;
      case "cost_high":
        result.sort(
          (a, b) =>
            (b.priceForTwo || b.costForTwo || 0) -
            (a.priceForTwo || a.costForTwo || 0),
        );
        break;
      default:
        break;
    }

    return result;
  }, [restaurants, searchQuery, selectedCuisine, sortBy]);

  const allCuisines = [
    "All",
    ...new Set(
      restaurants
        .flatMap((r) => (Array.isArray(r.cuisine) ? r.cuisine : [r.cuisine]))
        .filter(Boolean),
    ),
  ];

  const sortOptions = [
    { label: "Relevant", value: "relevant", icon: Filter },
    { label: "Rating: High to Low", value: "rating", icon: Star },
    { label: "Delivery Time: Fast First", value: "time", icon: Clock },
    { label: "Cost: Low to High", value: "cost_low", icon: DollarSign },
    { label: "Cost: High to Low", value: "cost_high", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-(--bg-main) font-(family-name:--font-poppins) flex flex-col">
      <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
            <div className="w-full md:w-auto">
              <h1 className="font-(family-name:--font-outfit) text-2xl font-bold text-gray-900 flex items-center gap-2">
                Order Online <span className="text-rose-500 text-3xl">.</span>
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {filteredRestaurants.length} restaurants near you
              </p>
            </div>

            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all sm:text-sm"
                placeholder="Search for restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex-1 w-full overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              <div className="flex gap-2">
                {allCuisines.slice(0, 8).map((cuisine) => (
                  <button
                    key={cuisine}
                    onClick={() => setSelectedCuisine(cuisine)}
                    className={`
                      whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all border
                      ${
                        selectedCuisine === cuisine
                          ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200"
                          : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                  ${
                    isSortOpen
                      ? "bg-gray-900 text-white shadow-lg"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                  }
                `}
              >
                <SlidersHorizontal size={16} />
                <span className="hidden sm:inline">Sort by</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsSortOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-2 space-y-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value);
                            setIsSortOpen(false);
                          }}
                          className={`
                            w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors
                            ${
                              sortBy === option.value
                                ? "bg-rose-50 text-rose-700 font-bold"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <option.icon
                              size={16}
                              className={
                                sortBy === option.value
                                  ? "text-rose-500"
                                  : "text-gray-400"
                              }
                            />
                            {option.label}
                          </div>
                          {sortBy === option.value && (
                            <Check size={16} className="text-rose-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grow w-full">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="flex flex-col gap-3">
                <div className="h-56 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <UtensilsCrossed size={48} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 font-(family-name:--font-outfit)">
              No restaurants found
            </h3>
            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
              We couldn't find any matches for your filters. Try clearing them
              to see all options.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCuisine("All");
                setSortBy("relevant");
              }}
              className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                data={restaurant}
                navigate={navigate}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

const RestaurantCard = ({ data, navigate }) => {
  const {
    _id,
    title,
    restaurantName,
    heroImage,
    photo,
    rating,
    deliveryTime,
    cuisine,
    priceForTwo,
    costForTwo,
    offer,
    isActive,
  } = data;

  const displayName = title || restaurantName;
  const displayImage =
    heroImage ||
    photo?.url ||
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop";
  const displayRating = rating || "New";
  const displayTime = deliveryTime || "30-40";
  const displayPrice = priceForTwo || costForTwo || 300;
  const displayCuisine = Array.isArray(cuisine)
    ? cuisine.join(", ")
    : cuisine || "Multi-cuisine";

  const isClosed = isActive === "inactive";

  return (
    <div
      onClick={() => navigate(`/restaurant/${_id}`)}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={displayImage}
          alt={displayName}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${isClosed ? "grayscale" : ""}`}
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {offer && !isClosed && (
          <div className="absolute top-4 left-0 bg-(--color-primary) text-white px-3 py-1 font-bold text-xs rounded-r-lg shadow-md uppercase tracking-wider">
            {offer}
          </div>
        )}

        {isClosed && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-black/80 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest border border-white/20">
              Closed
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
          <Clock size={12} className="text-(--color-primary)" /> {displayTime}{" "}
          min
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-(family-name:--font-outfit) text-xl font-bold text-gray-900 leading-tight line-clamp-1 group-hover:text-(--color-primary) transition-colors">
            {displayName}
          </h3>
          <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-md text-sm font-bold shadow-sm">
            {displayRating} <Star size={10} fill="white" />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <p className="text-sm text-gray-500 line-clamp-1 font-medium">
            {displayCuisine}
          </p>
          <p className="text-xs text-gray-400">₹{displayPrice} for two</p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-end text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-(--color-primary) transition-colors duration-300">
            View Menu <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
