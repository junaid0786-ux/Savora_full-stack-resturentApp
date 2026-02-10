import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Import Cart Context for badge count
import { Bell, ShoppingCart, Lock, ChevronLeft } from "lucide-react"; // Added Lock icon

const Header = () => {
  const { user, isLogin } = useAuth();
  const { getCartCount } = useCart(); // Get real-time count
  const navigate = useNavigate();
  const location = useLocation(); // Hook to check current path

  const role = user?.role || "user";
  const isCustomer = role === "customer" || role === "user";
  const isCartPage = location.pathname === "/cart"; // Check if on Cart Page

  const getDashboardPath = () => {
    switch (role) {
      case "admin": return "/admin-dashboard";
      case "manager": return "/manager-dashboard";
      case "partner": return "/partner-dashboard";
      default: return "/user-dashboard";
    }
  };

  const displayName = user?.fullName || user?.name || "User";
  const initials = displayName.charAt(0).toUpperCase();
  const userPhotoUrl = user?.profileImage || user?.photo?.url;

  return (
    <header className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 font-sans transition-all duration-300 ease-in-out ${isCartPage ? "py-2" : ""}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* --- LOGO SECTION --- */}
          <div className="flex items-center gap-4">
             {/* Show Back Button on Cart Page */}
             {isCartPage && (
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors md:hidden"
                >
                   <ChevronLeft size={24} />
                </button>
             )}

             <Link to="/" className="group shrink-0 flex items-center gap-3">
               {/* Logo Text */}
               <span
                 style={{ fontFamily: "var(--font-outfit)" }}
                 className="text-4xl font-extrabold text-rose-600 tracking-tight italic"
               >
                 Savora
                 <span className={`text-rose-400 ${!isLogin ? "animate-pulse" : ""}`}>.</span>
               </span>

               {/* Cart Page Badge */}
               {isCartPage && (
                 <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
                    <Lock size={16} className="text-green-600" />
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Secure Checkout</span>
                 </div>
               )}
             </Link>
          </div>

          {/* --- NAVIGATION (Hidden on Cart Page) --- */}
          {!isCartPage && (
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
                      `relative text-base tracking-wide transition-all duration-300 ease-out group transform-gpu ${
                        isActive
                          ? "text-rose-600 font-medium "
                          : "text-gray-600 font-medium hover:text-rose-600 "
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item}
                        <span
                          className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 rounded-full transition-all duration-300 ease-out ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          )}

          {/* --- RIGHT ACTIONS --- */}
          <div
            className="flex items-center gap-6 shrink-0"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {isLogin ? (
              <div className="flex items-center gap-4 animate-fade-in">
                {/* Icons Group */}
                <div className="flex items-center gap-3">
                  {!isCartPage && (
                    <button className="relative p-2.5 bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-95 group">
                      <Bell size={20} className="group-hover:rotate-12 transition-transform" />
                      <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-600 rounded-full border border-white animate-pulse"></span>
                    </button>
                  )}

                  {isCustomer && !isCartPage && (
                    <Link to="/cart">
                      <button className="relative p-2.5 bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all duration-300 ease-out hover:scale-110 active:scale-95 group">
                        <ShoppingCart size={20} className="group-hover:-rotate-12 transition-transform" />
                        {getCartCount() > 0 && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                            {getCartCount()}
                          </span>
                        )}
                      </button>
                    </Link>
                  )}
                </div>

                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                {/* Profile Pill */}
                <div
                  onClick={() => navigate(getDashboardPath())}
                  className="group flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 pr-3 rounded-xl transition-all duration-300 ease-out select-none border border-transparent hover:border-gray-100 hover:shadow-sm active:scale-95"
                >
                  <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-50 overflow-hidden text-rose-600 font-bold shadow-sm group-hover:scale-105 group-hover:border-rose-200 transition-all">
                    {userPhotoUrl && userPhotoUrl.trim() !== "" ? (
                      <img
                        src={userPhotoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-lg">{initials}</span>
                    )}
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-rose-600 transition-colors">
                      {displayName}
                    </p>
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1 group-hover:text-gray-600 transition-colors">
                      {isCustomer ? "My Dashboard" : "Manage"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 animate-fade-in">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-rose-600 font-bold transition-all duration-300 ease-out hover:bg-rose-50 rounded-lg active:scale-95"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:flex px-6 py-2.5 bg-rose-600 text-white rounded-full font-bold shadow-lg shadow-rose-200 hover:bg-rose-700 hover:shadow-rose-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300"
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