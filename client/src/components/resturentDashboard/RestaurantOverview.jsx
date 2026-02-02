import React, { useState } from "react";
import {
  IndianRupee,
  ShoppingBag,
  Utensils,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border-none text-xs">
        <p className="font-bold mb-1">{label}</p>
        <p className="text-rose-300">
          Revenue:{" "}
          <span className="text-white font-bold">
            ₹{payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const RestaurantOverview = () => {
  const [storeOpen, setStoreOpen] = useState(true);

  const weeklyData = [
    { name: "Mon", revenue: 12000 },
    { name: "Tue", revenue: 15500 },
    { name: "Wed", revenue: 11000 },
    { name: "Thu", revenue: 18000 },
    { name: "Fri", revenue: 24500 },
    { name: "Sat", revenue: 29000 },
    { name: "Sun", revenue: 21000 },
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "₹45,000",
      change: "+12.5%",
      isPositive: true,
      icon: IndianRupee,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "1,240",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingBag,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Avg. Order Value",
      value: "₹320",
      change: "-2.1%",
      isPositive: false,
      icon: TrendingUp,
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Menu Items",
      value: "45",
      change: "Added 3 new",
      isPositive: true,
      icon: Utensils,
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
  ];

  const popularItems = [
    { name: "Spicy Chicken Burger", orders: 120, price: "₹299" },
    { name: "Double Cheese Pizza", orders: 98, price: "₹450" },
    { name: "Mango Smoothie", orders: 85, price: "₹150" },
    { name: "Crispy Fries", orders: 76, price: "₹120" },
  ];

  const recentOrders = [
    {
      id: "#ORD-9921",
      customer: "Alex Johnson",
      items: "2 items",
      total: "₹540",
      status: "Cooking",
      time: "2 min ago",
    },
    {
      id: "#ORD-9920",
      customer: "Maria Garcia",
      items: "1 item",
      total: "₹250",
      status: "Pending",
      time: "5 min ago",
    },
    {
      id: "#ORD-9919",
      customer: "James Smith",
      items: "3 items",
      total: "₹1,200",
      status: "Delivered",
      time: "15 min ago",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 font-outfit">
            Welcome Back, Partner!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening in your restaurant today.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2 pl-4 rounded-xl shadow-sm border border-gray-100">
          <span className="text-sm font-semibold text-gray-600">
            Store Status:{" "}
            <span className={storeOpen ? "text-green-600" : "text-gray-400"}>
              {storeOpen ? "Open" : "Closed"}
            </span>
          </span>
          <button
            onClick={() => setStoreOpen(!storeOpen)}
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              storeOpen ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
                storeOpen ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 rounded-xl ${stat.bg} ${stat.text} group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon size={22} />
              </div>
              {stat.isPositive ? (
                <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg text-xs font-bold">
                  <ArrowUpRight size={14} /> {stat.change}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-lg text-xs font-bold">
                  <ArrowDownRight size={14} /> {stat.change}
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1 font-outfit group-hover:text-rose-600 transition-colors">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 font-outfit">
                Weekly Revenue
              </h3>
              <p className="text-xs text-gray-400">
                Income breakdown for the last 7 days
              </p>
            </div>
            <button className="text-gray-400 hover:text-rose-600 transition-colors p-2 hover:bg-gray-50 rounded-lg">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="w-full h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyData}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f3f4f6"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 11, fontWeight: 500 }}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "#fff1f2", opacity: 0.5 }}
                />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} barSize={32}>
                  {weeklyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill="#e11d48"
                      className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 font-outfit mb-4">
            Popular Items
          </h3>
          <div className="space-y-4 flex-1">
            {popularItems.map((item, i) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-rose-50 transition-colors cursor-default group border border-transparent hover:border-rose-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-white group-hover:text-rose-500 transition-colors">
                    Img
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-700 group-hover:text-rose-700 transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-rose-600 bg-white px-2 py-1 rounded-md shadow-sm border border-gray-100">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2.5 text-sm text-rose-600 font-bold border border-rose-100 rounded-xl hover:bg-rose-50 active:scale-95 transition-all">
            View All Menu
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800 font-outfit">
              Recent Orders
            </h3>
            <p className="text-xs text-gray-400">Live order updates</p>
          </div>
          <button className="text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline">
            See All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-rose-50/50 transition-colors duration-200"
                >
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {order.items}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Cooking"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          order.status === "Cooking"
                            ? "bg-blue-600 animate-pulse"
                            : order.status === "Pending"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                        }`}
                      ></span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RestaurantOverview;
