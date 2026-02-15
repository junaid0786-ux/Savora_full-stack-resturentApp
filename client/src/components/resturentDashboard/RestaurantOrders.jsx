import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  ChefHat,
  Truck,
  PackageCheck,
  RefreshCw,
  Search,
  ArrowRight
} from "lucide-react";
import toast from "react-hot-toast";
import api from "../../config/Api";
import { socket } from "../../config/socket";
import { useAuth } from "../../context/AuthContext";

// --- CUSTOM STYLES FOR SCROLLBAR HIDING ---
const scrollbarStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// --- STATUS CONFIGURATION (Refined for Savora Theme) ---
const statusConfig = {
  pending: { 
    bg: "bg-yellow-50", text: "text-yellow-700", border: "border-yellow-200", 
    icon: Clock, label: "Pending", actionLabel: "Accept" 
  },
  confirmed: { 
    bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", 
    icon: CheckCircle, label: "Confirmed", actionLabel: "Cook" 
  },
  preparing: { 
    bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", 
    icon: ChefHat, label: "Preparing", actionLabel: "Ready" 
  },
  "out-for-delivery": { 
    bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", 
    icon: Truck, label: "On Way", actionLabel: "Delivered" 
  },
  delivered: { 
    bg: "bg-green-50", text: "text-green-700", border: "border-green-200", 
    icon: PackageCheck, label: "Delivered", actionLabel: "Done" 
  },
  cancelled: { 
    bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-200", 
    icon: XCircle, label: "Cancelled", actionLabel: "Closed" 
  },
};

const RestaurantOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Fetch Orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/order/restaurant-orders");
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Could not load orders");
    } finally {
      setLoading(false);
    }
  };

  // 2. Update Status
  const updateStatus = async (orderId, newStatus) => {
    const previousOrders = [...orders]; // Backup for rollback
    
    // Optimistic Update
    setOrders(prev => prev.map(order => 
      order._id === orderId ? { ...order, status: newStatus } : order
    ));

    try {
      const { data } = await api.patch(`/order/update-status/${orderId}`, { status: newStatus });
      if (data.success) {
        toast.success(`Order marked as ${newStatus}`);
      }
    } catch (error) {
      setOrders(previousOrders); // Rollback on error
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // 3. Socket Logic
  useEffect(() => {
    fetchOrders();

    const handleNewOrder = (newOrder) => {
      // Audio trigger (uncomment if you have the file)
      // new Audio("/sounds/ding.mp3").play().catch(() => {});

      toast.custom((t) => (
        <div 
          onClick={() => toast.dismiss(t.id)}
          className="cursor-pointer flex items-center gap-4 bg-white border-l-4 border-rose-600 p-4 rounded-r-lg shadow-2xl animate-in slide-in-from-top-5 duration-300"
        >
          <div className="bg-rose-100 p-3 rounded-full text-rose-600">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">New Order Received!</h4>
            <p className="text-sm text-gray-500">#{newOrder._id.slice(-6).toUpperCase()} • ₹{newOrder.totalAmount}</p>
          </div>
        </div>
      ), { duration: 5000 });

      setOrders(prev => [newOrder, ...prev]);
    };

    const handleSocketUpdate = (updatedData) => {
      setOrders(prev => prev.map(order => 
        order._id === updatedData.orderId ? { ...order, status: updatedData.status } : order
      ));
    };

    if (socket && user) {
        socket.on("new_order", handleNewOrder);
        socket.on("order_status_updated", handleSocketUpdate);
    }

    return () => {
      socket.off("new_order", handleNewOrder);
      socket.off("order_status_updated", handleSocketUpdate);
    };
  }, [user]);

  // Helper: Format Address
  const formatAddress = (addr) => {
    if (!addr) return "N/A";
    return typeof addr === 'object' ? `${addr.address || ''}, ${addr.city || ''}` : addr;
  };

  // Filter & Search Logic
  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === "all" || order.status === activeFilter;
    const matchesSearch = order._id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customerID?.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50/50 gap-4">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
         <p className="text-rose-600 font-medium animate-pulse">Connecting to Savora Live...</p>
      </div>
    );
  }

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 font-sans text-gray-800">
        
        {/* --- HEADER --- */}
        <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <span className="text-rose-600">Savora</span> Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage restaurant orders in real-time</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
               <span className="relative flex h-2.5 w-2.5">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
               </span>
               Live
             </div>
             
             {/* Search Bar */}
             <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search ID or Name..." 
                  className="w-full md:w-64 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-200 transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>

             <button 
               onClick={fetchOrders} 
               className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:text-rose-600 hover:border-rose-200 transition-all shadow-sm active:scale-95"
             >
               <RefreshCw size={18} />
             </button>
          </div>
        </div>

        {/* --- TABS (Scrollable, Hidden Scrollbar) --- */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-gradient">
              {["all", "pending", "confirmed", "preparing", "out-for-delivery", "delivered"].map((status) => (
                  <button
                      key={status}
                      onClick={() => setActiveFilter(status)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
                          activeFilter === status 
                          ? "bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200 transform scale-105" 
                          : "bg-white text-gray-600 border-gray-200 hover:bg-rose-50 hover:border-rose-100"
                      }`}
                  >
                      {status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, " ")}
                  </button>
              ))}
          </div>
        </div>

        {/* --- DESKTOP TABLE VIEW --- */}
        <div className="hidden md:block max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Items</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length === 0 ? (
                  <tr>
                      <td colSpan="5" className="px-6 py-16 text-center text-gray-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                             <div className="bg-gray-50 p-4 rounded-full">
                                <ShoppingBag size={32} className="text-gray-300" />
                             </div>
                             <p>No orders found.</p>
                          </div>
                      </td>
                  </tr>
              ) : (
                  filteredOrders.map((order) => {
                  const config = statusConfig[order.status] || statusConfig.pending;
                  const StatusIcon = config.icon;

                  return (
                      <tr key={order._id} className="hover:bg-rose-50/30 transition-colors group">
                        {/* ID & Price */}
                        <td className="px-6 py-4">
                            <span className="block font-mono text-xs text-gray-400 mb-1">#{order._id.slice(-6).toUpperCase()}</span>
                            <span className="block font-bold text-gray-900">₹{order.totalAmount}</span>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
                                    {order.customerID?.fullName?.[0] || "U"}
                                </div>
                                <div>
                                    <p className="font-medium text-sm text-gray-900">{order.customerID?.fullName || "Guest"}</p>
                                    <p className="text-xs text-gray-500">{order.contactNumber}</p>
                                </div>
                            </div>
                        </td>

                        {/* Items */}
                        <td className="px-6 py-4">
                            <div className="flex flex-col gap-1 max-w-55">
                                {order.items.slice(0, 2).map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm text-gray-600">
                                        <span className="truncate">{item.itemName}</span>
                                        <span className="font-bold text-gray-900 ml-2">x{item.quantity}</span>
                                    </div>
                                ))}
                                {order.items.length > 2 && (
                                    <span className="text-xs text-rose-600 font-medium">+{order.items.length - 2} more...</span>
                                )}
                            </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}>
                                <StatusIcon size={12} />
                                {config.label}
                            </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                            <div className="flex justify-end items-center gap-2">
                                {order.status === "pending" ? (
                                    <>
                                        <button onClick={() => updateStatus(order._id, "cancelled")} className="p-2 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all" title="Reject">
                                            <XCircle size={20} />
                                        </button>
                                        <button onClick={() => updateStatus(order._id, "confirmed")} className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-200 transition-all hover:scale-105">
                                            Accept Order
                                        </button>
                                    </>
                                ) : order.status === "delivered" || order.status === "cancelled" ? (
                                    <span className="text-gray-300"><ArrowRight size={20} /></span>
                                ) : (
                                    <button 
                                        onClick={() => {
                                            const nextStatus = 
                                                order.status === "confirmed" ? "preparing" :
                                                order.status === "preparing" ? "out-for-delivery" : "delivered";
                                            updateStatus(order._id, nextStatus);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-gray-900 text-white text-xs font-bold hover:bg-black transition-all shadow-md flex items-center gap-2 ml-auto"
                                    >
                                        {config.actionLabel} <ArrowRight size={14} />
                                    </button>
                                )}
                            </div>
                        </td>
                      </tr>
                  );
                  })
              )}
            </tbody>
          </table>
        </div>

        {/* --- MOBILE CARD VIEW (Optimized for Small Screens) --- */}
        <div className="md:hidden space-y-4 pb-20">
            {filteredOrders.length === 0 && (
                <div className="text-center py-10 text-gray-400">No orders found</div>
            )}
            
            {filteredOrders.map((order) => {
                const config = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = config.icon;

                return (
                    <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-xs font-mono text-gray-400">#{order._id.slice(-6).toUpperCase()}</span>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                    <span className="text-xs text-gray-500">{new Date(order.createdAt || Date.now()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-xl">₹{order.totalAmount}</h3>
                            </div>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}>
                                <StatusIcon size={12} /> {config.label}
                            </span>
                        </div>

                        {/* Items Preview */}
                        <div className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-sm space-y-2">
                             {order.items.map((item, i) => (
                                 <div key={i} className="flex justify-between items-center">
                                     <span className="text-gray-700">{item.itemName}</span>
                                     <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded shadow-sm border border-gray-100">x{item.quantity}</span>
                                 </div>
                             ))}
                        </div>

                        {/* Customer & Address */}
                        <div className="flex items-start gap-3 px-1">
                             <MapPin size={16} className="text-rose-500 mt-0.5 shrink-0" />
                             <div>
                                 <p className="text-sm font-bold text-gray-900">{order.customerID?.fullName}</p>
                                 <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{formatAddress(order.deliveryAddress)}</p>
                             </div>
                        </div>

                        {/* Mobile Actions */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                            {order.status === "pending" ? (
                                <>
                                    <button 
                                        onClick={() => updateStatus(order._id, "cancelled")} 
                                        className="py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 active:scale-95 transition-all"
                                    >
                                        Reject
                                    </button>
                                    <button 
                                        onClick={() => updateStatus(order._id, "confirmed")} 
                                        className="py-3 rounded-xl bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-200 active:scale-95 transition-all"
                                    >
                                        Accept
                                    </button>
                                </>
                            ) : (
                                <button 
                                    disabled={order.status === "delivered" || order.status === "cancelled"}
                                    onClick={() => {
                                        const next = order.status === "confirmed" ? "preparing" :
                                                     order.status === "preparing" ? "out-for-delivery" : "delivered";
                                        updateStatus(order._id, next);
                                    }}
                                    className={`col-span-2 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 flex justify-center items-center gap-2 ${
                                        order.status === "delivered" || order.status === "cancelled" 
                                        ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" 
                                        : "bg-gray-900 text-white"
                                    }`}
                                >
                                    {order.status === "delivered" ? "Order Completed" : `Mark as ${config.actionLabel}`}
                                </button>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default RestaurantOrders;