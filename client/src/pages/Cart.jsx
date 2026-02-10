import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Clock,
  TicketPercent,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [cartItems]);

  const itemTotal = getCartTotal();
  const deliveryFee = itemTotal > 500 ? 0 : 40;
  const platformFee = 5;
  const gst = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + platformFee + gst;

  const userAddress = user?.address
    ? typeof user.address === "string"
      ? user.address
      : `${user.address.street || ""}, ${user.address.city || ""}`
    : null;

  const handlePlaceOrder = () => {
    if (!userAddress) {
      toast.error("Please add a delivery address first");
      return;
    }
    toast.success("Redirecting to Payment Gateway...");
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
        <Loader />
        <p className="mt-4 text-gray-500 font-medium text-sm animate-pulse">
          Syncing cart...
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6">
            <UtensilsCrossed size={64} className="text-gray-200" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 font-(family-name:--font-outfit) mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8 text-center max-w-sm text-sm">
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </p>
          <Link
            to="/order"
            className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-600/20 hover:bg-rose-700 hover:scale-105 transition-all flex items-center gap-2"
          >
            See Restaurants Near You
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-(family-name:--font-poppins) flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 md:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-(family-name:--font-outfit) mb-8">
          Secure Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 font-(family-name:--font-outfit)">
                      Order Summary
                    </h2>
                    <p className="text-xs text-gray-500">
                      {cartItems.length} Items
                    </p>
                  </div>
                </div>
                <button
                  onClick={clearCart}
                  className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={14} /> Clear
                </button>
              </div>

              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                      <img
                        src={
                          item.images?.[0]?.url || "https://placehold.co/150"
                        }
                        alt={item.itemName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-0.5">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">
                          {item.itemName}
                        </h3>
                        <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                          ₹{item.price * item.qty}
                        </span>
                      </div>

                      <div className="flex justify-between items-end mt-2">
                        <p className="text-xs text-gray-400 font-medium">
                          ₹{item.price} x {item.qty}
                        </p>

                        <div className="flex items-center border border-gray-200 rounded-lg bg-white h-7 shadow-sm">
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="w-8 h-full flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Minus size={14} strokeWidth={2.5} />
                          </button>
                          <span className="text-xs font-bold text-gray-900 px-1 min-w-5 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-8 h-full flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors"
                          >
                            <Plus size={14} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                <Clock size={16} className="text-gray-400" /> Delivery
                Instructions
              </h3>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {["Avoid calling", "Leave at door", "Directions to reach"].map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        setInstructions((prev) =>
                          prev.includes(opt) ? prev : `${prev} ${opt}`.trim(),
                        )
                      }
                      className="whitespace-nowrap px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-all"
                    >
                      {opt}
                    </button>
                  ),
                )}
              </div>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any specific instructions for the delivery partner?"
                className="w-full mt-4 bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 transition-all resize-none h-20 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="lg:w-95 space-y-6">
            {itemTotal > 500 && (
              <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 flex items-start gap-3 relative overflow-hidden">
                <div className="bg-green-100 p-2 rounded-full text-green-700 relative z-10">
                  <TicketPercent size={18} />
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-green-800 text-sm">
                    Free Delivery Unlocked!
                  </h4>
                  <p className="text-xs text-green-600 mt-0.5">
                    You saved ₹40 on this order.
                  </p>
                </div>
              </div>
            )}

            {/* Bill Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-5 font-(family-name:--font-outfit)">
                Bill Summary
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Delivery Fee
                    {itemTotal > 500 && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-1.5 rounded">
                        FREE
                      </span>
                    )}
                  </span>
                  <span
                    className={
                      deliveryFee === 0 ? "text-green-600 font-medium" : ""
                    }
                  >
                    {deliveryFee === 0 ? "₹0" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted decoration-gray-300 underline-offset-2">
                    Platform Fee
                  </span>
                  <span>₹{platformFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted decoration-gray-300 underline-offset-2">
                    GST (5%)
                  </span>
                  <span>₹{gst}</span>
                </div>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between items-center text-base font-black text-gray-900 font-(family-name:--font-outfit)">
                <span>TO PAY</span>
                <span className="text-lg">₹{grandTotal}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${userAddress ? "bg-gray-100 text-gray-600" : "bg-red-50 text-red-500"}`}
                  >
                    {userAddress ? (
                      <MapPin size={18} />
                    ) : (
                      <AlertCircle size={18} />
                    )}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      DELIVERING TO
                    </p>
                    {userAddress ? (
                      <p className="text-sm font-bold text-gray-900 truncate max-w-35">
                        {userAddress}
                      </p>
                    ) : (
                      <p className="text-sm font-bold text-red-500">
                        Address missing
                      </p>
                    )}
                  </div>
                </div>
                {/* In a real app, this would open an address modal */}
                <button className="text-rose-600 text-xs font-bold hover:bg-rose-50 px-2 py-1 rounded transition-colors">
                  {userAddress ? "CHANGE" : "ADD"}
                </button>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!userAddress}
                className={`w-full py-3.5 rounded-xl font-bold text-base shadow-lg flex items-center justify-between px-5 group transition-all
                   ${
                     userAddress
                       ? "bg-gray-900 text-white hover:bg-black hover:scale-[1.02] shadow-gray-900/20"
                       : "bg-gray-200 text-gray-400 cursor-not-allowed"
                   }
                 `}
              >
                <span>Pay ₹{grandTotal}</span>
                <span
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg text-xs font-medium transition-colors ${userAddress ? "bg-white/20 group-hover:bg-white/30" : "bg-transparent"}`}
                >
                  Proceed <ArrowRight size={14} />
                </span>
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                <ShieldCheck size={12} className="text-green-500" /> 100% Safe
                Payments
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Loader = () => (
  <div className="w-10 h-10 border-4 border-gray-200 border-t-rose-600 rounded-full animate-spin"></div>
);

export default Cart;
