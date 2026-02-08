import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/Api";
import {
  Star,
  MapPin,
  Clock,
  Search,
  ChevronLeft,
  Heart,
  Share2,
  Loader2,
  UtensilsCrossed,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await api.get(`/public/restaurant/${id}`);
        if (data.success) {
          setRestaurant(data.data.profile);
          setMenuItems(data.data.menu);
        }
      } catch (error) {
        toast.error("Failed to load restaurant details");
        navigate("/order");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, navigate]);

  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const vegIcon = (
    <div className="border border-green-600 p-1 rounded-sm w-4 h-4 flex items-center justify-center shrink-0">
      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
    </div>
  );

  const nonVegIcon = (
    <div className="border border-red-600 p-1 rounded-sm w-4 h-4 flex items-center justify-center shrink-0">
      <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-[6px] border-b-red-600"></div>
    </div>
  );

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-rose-600" size={40} />
      </div>
    );

  if (!restaurant) return null;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20 font-sans animate-fade-in">
      <div className="relative h-72 md:h-80 lg:h-96 group">
        <div className="absolute inset-0 bg-gray-900">
          <img
            src=""
            className="w-full h-full object-cover opacity-60"
            alt="Cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/10"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/10">
              <Heart size={20} />
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-md text-white rounded-full hover:bg-white/20 transition-all active:scale-95 border border-white/10">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-6 md:gap-8">
            <div className="w-28 h-28 md:w-40 md:h-40 rounded-3xl bg-white p-1 shadow-2xl -mb-12 shrink-0 relative z-20 overflow-hidden">
              <img
                src={
                  restaurant.photo?.url || "https://ui-avatars.com/api/?name=R"
                }
                className="w-full h-full object-cover rounded-2xl"
                alt="Logo"
              />
            </div>

            <div className="flex-1 text-white mb-1">
              <h1 className="text-3xl md:text-5xl font-bold font-brand tracking-tight shadow-sm">
                {restaurant.restaurantName}
              </h1>
              <p className="text-gray-300 text-sm md:text-base mt-2 font-medium flex items-center gap-2">
                {restaurant.cuisine}
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                {restaurant.address}, {restaurant.city}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-1.5 bg-green-500/90 backdrop-blur-md px-3 py-1 rounded-lg text-white border border-green-400/30">
                  <Star size={14} fill="white" />
                  <span className="font-bold text-sm">4.2</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-white border border-white/10">
                  <Clock size={14} />
                  <span className="font-medium text-sm">30-40 mins</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-white border border-white/10">
                  <MapPin size={14} />
                  <span className="font-medium text-sm">2.5 km</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20 md:mt-16">
        <div className="sticky top-0 z-30 bg-gray-50/95 backdrop-blur-xl py-4 -mx-4 px-4 md:mx-0 md:px-0 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-200 mb-8">
          <h2 className="text-xl font-bold text-gray-900 font-brand">
            Menu{" "}
            <span className="text-gray-400 text-sm font-normal ml-1">
              ({menuItems.length} items)
            </span>
          </h2>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64 group">
              <Search
                className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-rose-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for dishes..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all shadow-sm"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:border-rose-500 cursor-pointer shadow-sm"
            >
              <option value="all">All</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-75">
            <UtensilsCrossed size={48} className="text-gray-300 mb-4" />
            <h3 className="text-lg font-bold text-gray-800">No items found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMenu.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300 flex gap-4 h-full relative overflow-hidden"
              >
                <div className="flex-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === "veg" ? vegIcon : nonVegIcon}
                      {item.bestseller && (
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1 group-hover:text-rose-600 transition-colors font-brand">
                    {item.itemName}
                  </h3>
                  <p className="font-bold text-gray-900 text-sm">
                    ₹{item.price}
                  </p>

                  <p className="text-gray-500 text-xs mt-3 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-3 flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    {item.servingSize && <span>{item.servingSize}</span>}
                    {item.preparationTime && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{item.preparationTime}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="relative w-36 h-32 shrink-0">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-gray-50">
                    <img
                      src={
                        item.images?.[0]?.url ||
                        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                      }
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={item.itemName}
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24">
                    {item.availability === "available" ? (
                      <button
                        onClick={() => toast.success(`${item.itemName} added`)}
                        className="w-full bg-white text-green-600 font-extrabold text-sm py-2 rounded-lg shadow-lg border border-gray-100 hover:bg-green-50 active:scale-95 transition-all flex items-center justify-center uppercase tracking-wide"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="w-full bg-gray-100 text-gray-400 font-bold text-xs py-2 rounded-lg border border-gray-200 text-center uppercase">
                        Sold Out
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
