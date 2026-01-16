import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="group">
            <span
              style={{ fontFamily: "var(--font-outfit)" }}
              className="text-4xl font-extrabold text-rose-600 tracking-tight italic hover:text-rose-700 transition-colors"
            >
              Savora
              <span className="text-rose-400">.</span>
            </span>
          </Link>

          <nav 
            className="hidden md:flex gap-10 items-center"
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
                        className={`absolute -bottom-1 left-0 h-0.5 bg-rose-600 transition-all duration-300 ease-out ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div 
            className="flex items-center gap-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <Link
              to="/login"
              className="text-gray-700 hover:text-rose-700 font-semibold text-base transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-rose-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-200 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;