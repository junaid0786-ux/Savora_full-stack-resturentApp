import React, { useState, useEffect } from "react";
import {
  Wallet,
  Clock,
  MapPin,
  ArrowRight,
  CreditCard,
  ChefHat,
  Star,
} from "lucide-react";

const UserOverview = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const date = new Date();
    setCurrentDate(
      date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    );

    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const fullName = parsedUser.name || parsedUser.fullName || "User";
        setUserName(fullName.split(" ")[0]);
      }
    } catch (error) {
      console.error("Failed to load user name:", error);
    }
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl animate-fade-in text-(--text-main)">
      <div className="flex justify-between items-end border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-brand">
            Welcome back, <span className="text-rose-600">{userName}</span>
          </h1>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-(--text-muted) text-sm font-medium">Today</p>
          <p className="font-bold text-lg font-brand">{currentDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="bg-(--bg-card) p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between 
          transition-all duration-300 hover:shadow-xl hover:shadow-(--color-primary)/10 hover:-translate-y-1 group cursor-default"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-(--bg-main) rounded-xl text-(--text-muted) group-hover:bg-(--color-primary) group-hover:text-white transition-colors duration-300">
              <Wallet size={22} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full font-brand">
              +20%
            </span>
          </div>
          <div className="mt-4">
            <p className="text-(--text-muted) text-xs font-medium uppercase tracking-wide">
              Wallet Balance
            </p>
            <h3 className="text-3xl font-bold mt-1 font-brand">₹0.00</h3>
          </div>
        </div>

        <div
          className="bg-(--bg-card) p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between 
          transition-all duration-300 hover:shadow-xl hover:shadow-(--color-primary)/10 hover:-translate-y-1 group cursor-default"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-(--bg-main) rounded-xl text-(--text-muted) group-hover:bg-(--color-primary) group-hover:text-white transition-colors duration-300">
              <ChefHat size={22} />
            </div>
            <span className="text-xs font-bold text-(--text-muted) bg-(--bg-main) px-2.5 py-1 rounded-full font-brand">
              Total
            </span>
          </div>
          <div className="mt-4">
            <p className="text-(--text-muted) text-xs font-medium uppercase tracking-wide">
              Orders Placed
            </p>
            <h3 className="text-3xl font-bold mt-1 font-brand">20</h3>
          </div>
        </div>

        <div
          className="bg-(--bg-card) p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between 
          transition-all duration-300 hover:shadow-xl hover:shadow-(--color-primary)/10 hover:-translate-y-1 group cursor-default"
        >
          <div className="flex justify-between items-start">
            <div className="p-3 bg-(--bg-main) rounded-xl text-(--text-muted) group-hover:bg-(--color-primary) group-hover:text-white transition-colors duration-300">
              <Star size={22} />
            </div>
            <span className="text-xs font-bold text-(--color-primary) bg-rose-50 px-2.5 py-1 rounded-full font-brand">
              Elite
            </span>
          </div>
          <div className="mt-4">
            <p className="text-(--text-muted) text-xs font-medium uppercase tracking-wide">
              Loyalty Points
            </p>
            <h3 className="text-3xl font-bold mt-1 font-brand">99 Pts</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 bg-(--bg-card) rounded-2xl border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-lg font-brand">Recent Activity</h3>
            <button className="text-sm text-(--text-muted) hover:text-(--color-primary) transition-all flex items-center gap-1 group font-medium">
              View All{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="p-3 flex-1 flex flex-col gap-1">
            <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-(--bg-main) cursor-pointer group border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-(--bg-main) overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Burger"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-(--color-primary) transition-colors font-brand">
                    Spicy Chicken Burger
                  </h4>
                  <p className="text-xs text-(--text-muted) mt-1">
                    12 Jan • KFC
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm font-brand">₹349</p>
                <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  Delivered
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-(--bg-main) cursor-pointer group border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-(--bg-main) overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Pizza"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-(--color-primary) transition-colors font-brand">
                    Pepperoni Pizza
                  </h4>
                  <p className="text-xs text-(--text-muted) mt-1">
                    10 Jan • Domino's
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm font-brand">₹599</p>
                <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  Delivered
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:bg-(--bg-main) cursor-pointer group border border-transparent hover:border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-(--bg-main) overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Salad"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-(--color-primary) transition-colors font-brand">
                    Greek Salad Bowl
                  </h4>
                  <p className="text-xs text-(--text-muted) mt-1">
                    08 Jan • Subway
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm font-brand">₹249</p>
                <p className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                  Delivered
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-(--color-primary) rounded-2xl p-6 text-white shadow-xl shadow-rose-200 relative overflow-hidden group hover:shadow-2xl hover:shadow-(--color-primary)/40 transition-all duration-500 cursor-pointer">
            <div className="absolute -top-5 -right-5 p-0 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 ease-in-out">
              <Clock size={120} />
            </div>

            <h3 className="font-bold text-lg relative z-10 font-brand">
              Live Order
            </h3>
            <div className="mt-6 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-rose-100 text-xs font-bold uppercase tracking-widest">
                  Arrival
                </span>
                <span className="font-bold font-brand text-lg">15 Mins</span>
              </div>
              <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden backdrop-blur-sm">
                <div className="bg-white w-[70%] h-full rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse"></div>
              </div>

              <div className="mt-5 flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 group-hover:bg-white/20 transition-colors">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-(--color-primary) shadow-sm">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-rose-100 font-medium">
                    Delivery Partner
                  </p>
                  <p className="text-sm font-bold font-brand"></p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a] rounded-2xl p-6 text-white shadow-lg flex-1 flex flex-col justify-center items-start relative overflow-hidden group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute -right-5 -bottom-7.5 opacity-10 group-hover:opacity-20 group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500">
              <CreditCard size={120} />
            </div>
            <h3 className="text-xl font-bold mb-2 font-brand">Top Up Wallet</h3>
            <p className="text-slate-400 text-xs mb-6 max-w-[80%] leading-relaxed">
              Add funds securely for a faster, one-click checkout experience.
            </p>
            <button className="bg-(--color-primary) hover:bg-(--color-hover) text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-(--color-primary)/40 active:scale-95 z-10 font-brand">
              Add Money
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
