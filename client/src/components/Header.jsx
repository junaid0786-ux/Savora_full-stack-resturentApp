import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search, Bell, ShoppingCart } from "lucide-react";

const Header = () => {
  const { user, isLogin } = useAuth();

  const displayName = user?.fullName || user?.name || "User";
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 font-sans transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          <Link to="/" className="group shrink-0">
            <span
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-4xl font-extrabold text-rose-600 tracking-tight italic hover:text-rose-700 transition-colors"
            >
              Savora
              <span className="text-rose-400">.</span>
            </span>
          </Link>

          {isLogin ? (
            <div className="hidden md:flex flex-1 max-w-xl mx-auto relative group">
              <input
                type="text"
                placeholder="Search for food, restaurants..."
                className="w-full bg-gray-100 border-2 border-transparent text-gray-700 rounded-xl py-2.5 pl-12 pr-4 focus:outline-none focus:bg-white focus:border-rose-100 focus:ring-4 focus:ring-rose-500/10 transition-all placeholder-gray-400 font-medium"
              />
              <Search
                className="absolute left-4 top-3 text-gray-400 group-focus-within:text-rose-500 transition-colors"
                size={20}
              />
            </div>
          ) : (
            <nav
              className="hidden md:flex gap-8 items-center justify-center flex-1"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {["Home", "About", "Contact"].map((item) => {
                const path = item === "Home" ? "/" : `/${item.toLowerCase()}`;
                return (
                  <NavLink
                    key={item}
                    to={path}
                    className={({ isActive }) =>
                      `relative text-base tracking-wide transition-colors duration-300 group ${
                        isActive
                          ? "text-rose-600 font-bold"
                          : "text-gray-600 font-medium hover:text-rose-600"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item}
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                        ></span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}

          <div
            className="flex items-center gap-6 shrink-0"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {isLogin ? (
              <div className="flex items-center gap-5 animate-fade-in">
                <div className="flex items-center gap-3">
                  <button className="relative p-2.5 bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-600 rounded-full border border-white"></span>
                  </button>

                  <button className="relative p-2.5 bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all">
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">
                      3
                    </span>
                  </button>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                <Link to="/user-dashboard">
                  <div className="group flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-all select-none border border-transparent hover:border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-50 overflow-hidden text-rose-600 font-bold shadow-sm group-hover:scale-105 transition-transform">
                      {initials}
                    </div>

                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-rose-600 transition-colors">
                        {displayName}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        My Dashboard
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 animate-fade-in">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-rose-600 font-bold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:flex px-6 py-2.5 bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
