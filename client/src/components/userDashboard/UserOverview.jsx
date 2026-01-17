import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Wallet,
  Clock,
  MapPin,
  ArrowRight,
  CreditCard,
  ChefHat,
  Star,
} from "lucide-react";

const UserOverview = () => {
  const [userName, setUserName] = useState("Foodie");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        if (parsed.name) setUserName(parsed.name.split(" ")[0]);
      } catch (e) {
        console.error(e);
      }
    }

    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    );
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl animate-fade-in">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <p className="text-xs font-bold text-rose-600 tracking-wider uppercase mb-1">
            Overview
          </p>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome back, <span className="text-rose-600">Junaid</span>
          </h1>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-gray-400 text-sm font-medium">Today</p>
          <p className="text-gray-800 font-bold text-lg">{currentDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between 
          transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 hover:border-rose-200 cursor-default group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Wallet size={20} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              +20%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
              Wallet Balance
            </p>
            <h3 className="text-2xl font-bold text-gray-900">₹4,550.00</h3>
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between 
          transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 hover:border-rose-200 cursor-default group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <ChefHat size={20} />
            </div>
            <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
              Total
            </span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
              Orders Placed
            </p>
            <h3 className="text-2xl font-bold text-gray-900">124</h3>
          </div>
        </div>

        <div
          className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between 
          transition-all duration-300 hover:shadow-lg hover:shadow-rose-100/50 hover:-translate-y-1 hover:border-rose-200 cursor-default group"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Star size={20} />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              Elite
            </span>
          </div>
          <div className="mt-4">
            <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">
              Loyalty Points
            </p>
            <h3 className="text-2xl font-bold text-gray-900">850 Pts</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Recent Activity</h3>
            <button className="text-sm text-gray-400 hover:text-rose-600 hover:underline transition-all flex items-center gap-1 group">
              View All{" "}
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="p-2 flex-1">
            <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-rose-50/50 hover:scale-[1.01] cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Burger"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm group-hover:text-rose-600 transition-colors">
                    Spicy Chicken Burger
                  </h4>
                  <p className="text-xs text-gray-400">12 Jan • KFC</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-sm">₹349</p>
                <p className="text-xs text-green-600 font-medium">Delivered</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-rose-50/50 hover:scale-[1.01] cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Pizza"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm group-hover:text-rose-600 transition-colors">
                    Pepperoni Pizza
                  </h4>
                  <p className="text-xs text-gray-400">10 Jan • Domino's</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-sm">₹599</p>
                <p className="text-xs text-green-600 font-medium">Delivered</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-rose-50/50 hover:scale-[1.01] cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Salad"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm group-hover:text-rose-600 transition-colors">
                    Greek Salad Bowl
                  </h4>
                  <p className="text-xs text-gray-400">08 Jan • Subway</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800 text-sm">₹249</p>
                <p className="text-xs text-green-600 font-medium">Delivered</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-rose-600 rounded-2xl p-6 text-white shadow-lg shadow-rose-200 relative overflow-hidden group hover:shadow-xl hover:shadow-rose-300 transition-shadow duration-300 cursor-pointer">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Clock size={80} />
            </div>

            <h3 className="font-bold text-lg relative z-10">Live Order</h3>
            <div className="mt-4 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-rose-100 text-xs font-medium uppercase tracking-wider">
                  Estimated Arrival
                </span>
                <span className="font-bold">15 Mins</span>
              </div>
              <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white w-[70%] h-full rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
              </div>

              <div className="mt-4 flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10 group-hover:bg-white/20 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-rose-600 shadow-sm">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-rose-100">Driver</p>
                  <p className="text-sm font-bold">Amit Kumar</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-lg flex-1 flex flex-col justify-center items-start relative overflow-hidden group cursor-pointer hover:shadow-xl hover:shadow-gray-400 transition-all duration-300">
            <div className="absolute -right-5 -bottom-5 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
              <CreditCard size={100} />
            </div>
            <h3 className="text-xl font-bold mb-1">Add Balance</h3>
            <p className="text-gray-400 text-xs mb-4">
              Top up your wallet for faster checkout.
            </p>
            <button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg active:scale-95">
              Top Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
