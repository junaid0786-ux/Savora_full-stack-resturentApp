import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../config/Api";
import Footer from "../components/Footer";
import {
  Search,
  MapPin,
  ArrowRight,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  Bike,
  Martini,
} from "lucide-react";

const categories = [
  {
    name: "Biryani",
    img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Burger",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Pizza",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Rolls",
    img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Cake",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Thali",
    img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Noodles",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Dosa",
    img: "https://images.unsplash.com/photo-1668236543090-d2f896953bf0?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Paneer",
    img: "https://images.unsplash.com/photo-1567188040754-8171662738b9?q=80&w=500&auto=format&fit=crop",
  },
  {
    name: "Paratha",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=500&auto=format&fit=crop",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [displayRestaurants, setDisplayRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    fetchRestaurants();

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchRestaurants = async (query = "") => {
    try {
      setLoading(true);
      const { data } = await api.get(`/public/restaurants?search=${query}`);
      if (data.success) {
        setRestaurants(data.data);
        setDisplayRestaurants(data.data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      setShowSuggestions(true);
      const filtered = restaurants.filter(
        (r) =>
          (r.title || r.restaurantName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          (r.cuisine &&
            r.cuisine.toString().toLowerCase().includes(value.toLowerCase())),
      );
      setSuggestions(filtered);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}`);
    setShowSuggestions(false);
  };

  const handleFullSearch = () => {
    const filtered = restaurants.filter((r) =>
      (r.title || r.restaurantName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setDisplayRestaurants(filtered);
    setShowSuggestions(false);
    document
      .getElementById("restaurant-grid")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-(--bg-main) font-(family-name:--font-poppins) flex flex-col">
      <section className="relative w-full h-150 flex flex-col justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#e11d48] z-0">
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20"></div>
          <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-rose-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-orange-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-[20%] w-150 h-150 bg-rose-600 rounded-full mix-blend-multiply filter blur-[120px] opacity-70 animate-blob animation-delay-4000"></div>
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-5xl space-y-8">
          <div className="space-y-4">
            <h1 className="font-(family-name:--font-outfit) text-6xl md:text-8xl font-black text-white tracking-tight drop-shadow-2xl">
              Savora
              <span className="text-rose-200">.</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/90 font-medium tracking-wide max-w-2xl mx-auto leading-relaxed">
              Cravings delivered to your doorstep,{" "}
              <br className="hidden md:block" /> within minutes.
            </p>
          </div>

          <div
            ref={searchRef}
            className={`
              relative z-50 bg-white/95 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row items-center gap-2 w-full max-w-3xl mx-auto transition-all duration-300
              ${isSearchFocused ? "shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] scale-[1.02] ring-2 ring-white/50" : "shadow-2xl shadow-rose-900/30 hover:scale-[1.01]"}
            `}
          >
            <div className="flex items-center gap-3 px-5 py-3 w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-200/60 bg-white md:bg-transparent rounded-xl">
              <div
                className={`p-1.5 rounded-full transition-colors ${isSearchFocused ? "bg-rose-100 text-rose-600" : "bg-rose-50 text-(--color-primary)"}`}
              >
                <MapPin size={20} />
              </div>
              <input
                type="text"
                value={location}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Nainital, India"
                className="w-full text-gray-800 font-bold text-base bg-transparent focus:outline-none placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            <div className="flex items-center gap-3 px-5 py-3 w-full md:flex-1 relative bg-white md:bg-transparent rounded-xl">
              <div
                className={`p-1.5 rounded-full transition-colors ${isSearchFocused ? "bg-rose-100 text-rose-600" : "bg-gray-50 text-gray-400"}`}
              >
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onFocus={() => setIsSearchFocused(true)}
                onChange={handleSearchChange}
                placeholder="Search for restaurant, cuisine..."
                className="w-full text-gray-800 font-medium text-base bg-transparent focus:outline-none placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={handleFullSearch}
              className="hidden md:flex bg-linear-to-r from-(--color-primary) to-rose-700 text-white px-8 py-3 rounded-xl font-bold text-base hover:brightness-110 transition-all shadow-lg shadow-rose-500/30 active:scale-95"
            >
              Search
            </button>

            {showSuggestions && (
              <div className="absolute top-[115%] left-0 w-full bg-white rounded-2xl shadow-2xl overflow-hidden z-60 border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
                <div className="py-2">
                  <h3 className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Top Results
                  </h3>
                  {suggestions.length > 0 ? (
                    suggestions.slice(0, 5).map((item) => (
                      <div
                        key={item._id}
                        onClick={() => handleSuggestionClick(item._id)}
                        className="px-6 py-3 hover:bg-rose-50 cursor-pointer flex items-center gap-4 border-b border-gray-50 last:border-none group transition-colors"
                      >
                        <img
                          src={
                            item.heroImage ||
                            item.photo?.url ||
                            "https://placehold.co/100"
                          }
                          alt="rest"
                          className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <div className="text-left">
                          <h4 className="font-bold text-gray-800 text-sm group-hover:text-(--color-primary) transition-colors">
                            {item.title || item.restaurantName}
                          </h4>
                          <p className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] font-bold">
                              Kitchen
                            </span>
                            {Array.isArray(item.cuisine)
                              ? item.cuisine.join(", ")
                              : item.cuisine}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-8 text-center text-gray-500">
                      <p className="text-sm">No delicious matches found.</p>
                      <button
                        onClick={() => setShowSuggestions(false)}
                        className="text-rose-500 text-xs font-bold mt-2 hover:underline"
                      >
                        Close
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 w-full leading-none z-10">
          <svg
            className="block w-full h-15 md:h-25"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/order")}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-100 group flex items-center justify-between overflow-hidden relative"
          >
            <div className="relative z-10">
              <h3 className="font-(family-name:--font-outfit) text-2xl font-bold text-gray-800 mb-2">
                Order Online
              </h3>
              <p className="text-gray-500 mb-4">
                Stay home and order to your doorstep
              </p>
              <span className="text-(--color-primary) font-bold group-hover:underline flex items-center gap-2">
                Order Now <ArrowRight size={18} />
              </span>
            </div>
            <div className="w-32 h-32 bg-rose-50 rounded-full flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <Bike size={64} className="text-(--color-primary) opacity-80" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-gray-100 group flex items-center justify-between overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-(family-name:--font-outfit) text-2xl font-bold text-gray-800 mb-2">
                Nightlife
              </h3>
              <p className="text-gray-500 mb-4">
                Explore the city's top party scenes
              </p>
              <span className="text-(--color-primary) font-bold group-hover:underline flex items-center gap-2">
                Explore <ArrowRight size={18} />
              </span>
            </div>
            <div className="w-32 h-32 bg-rose-50 rounded-full flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <Martini
                size={64}
                className="text-(--color-primary) opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-(--bg-main) py-16">
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-(family-name:--font-outfit) text-3xl font-bold text-gray-900">
              What's on your mind?
            </h2>

            <div className="flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={20} className="text-gray-700" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="shrink-0 flex flex-col items-center gap-4 cursor-pointer group"
              >
                <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl group-hover:border-(--color-primary) transition-all duration-300">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-700 text-lg group-hover:text-(--color-primary) transition-colors">
                  {cat.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="restaurant-grid" className="bg-white py-16 grow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="font-(family-name:--font-outfit) text-3xl font-bold text-gray-900">
              {searchTerm
                ? `Results for "${searchTerm}"`
                : "Top brands for you"}
            </h2>
            <Link
              to="/order"
              className="flex items-center gap-1 text-(--color-primary) font-semibold hover:gap-2 transition-all"
            >
              See all <ChevronRight size={20} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-80 bg-gray-100 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : displayRestaurants.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-gray-100 p-6 rounded-full mb-4">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 font-(family-name:--font-outfit)">
                No restaurants found
              </h3>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setDisplayRestaurants(restaurants);
                }}
                className="mt-6 text-(--color-primary) font-bold hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayRestaurants.map((rest) => (
                <div
                  key={rest._id}
                  onClick={() => navigate(`/restaurant/${rest._id}`)}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={
                        rest.heroImage ||
                        rest.photo?.url ||
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop"
                      }
                      alt={rest.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {rest.offer && (
                      <div className="absolute bottom-4 left-0 bg-(--color-primary) text-white px-3 py-1 font-bold text-sm rounded-r-lg shadow-md">
                        {rest.offer}
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-gray-800">
                      {rest.deliveryTime || 30} min
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-(family-name:--font-outfit) text-xl font-bold text-gray-900 line-clamp-1">
                        {rest.title || rest.restaurantName}
                      </h3>
                      <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-md text-sm font-bold">
                        {rest.rating || "4.0"} <Star size={12} fill="white" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span className="truncate max-w-[60%]">
                        {Array.isArray(rest.cuisine)
                          ? rest.cuisine.join(", ")
                          : rest.cuisine || "Multi-cuisine"}
                      </span>
                      <span>₹{rest.priceForTwo || 300} for two</span>
                    </div>

                    <hr className="border-gray-100 mb-4" />

                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                      <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                        <Clock size={12} className="text-purple-600" />
                      </div>
                      <span>Live tracking available</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
