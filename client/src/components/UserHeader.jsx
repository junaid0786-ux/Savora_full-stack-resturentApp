import React from "react";
import { Search, Bell, ShoppingCart } from "lucide-react";

const UserHeader = ({ setActive }) => {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-2">
        <h1
          onClick={() => setActive("overview")}
          className="text-3xl font-bold text-rose-600 tracking-tighter cursor-pointer"
        >
          Savora
          <span className="text-rose-400">.</span>
        </h1>
      </div>

      <div className="hidden md:flex flex-1 max-w-xl mx-10 relative">
        <input
          type="text"
          placeholder="Search for food, restaurants, or orders..."
          className="w-full bg-gray-100 border-none text-gray-700 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all placeholder-gray-400 font-medium"
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
      </div>

      <div className="flex items-center gap-6">
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-600 rounded-full border border-white"></span>
          </button>

          <button
            onClick={() => setActive("orders")}
            className="relative p-2.5 bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-600 rounded-full transition-all"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold border-2 border-white">
              3
            </span>
          </button>
        </div>

        <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

        <div
          onClick={() => setActive("profile")}
          className="group flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors select-none "
        >
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center border-2 border-rose-50 overflow-hidden text-rose-600 font-bold">
            JK
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-rose-600 transition-all duration-300">
              Junaid Khan
            </p>
            <p className="text-xs text-gray-500 font-medium">User Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
