import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../config/Api";
import Footer from "../components/Footer";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed,
  Phone,
  CheckCircle2,
  Building,
  Navigation,
} from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    restaurant,
  } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [contactNumber, setContactNumber] = useState("");
  const [addressDetails, setAddressDetails] = useState({
    address: "",
    city: "",
    pin: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    if (user) {
      setContactNumber(user.mobileNumber || "");
      if (user.address && typeof user.address === "object") {
        setAddressDetails({
          address: user.address.street || "",
          city: user.address.city || "",
          pin: user.address.pincode || "",
        });
      }
    }
    return () => clearTimeout(timer);
  }, [user]);

  const itemTotal = getCartTotal();
  const deliveryFee = itemTotal > 500 ? 0 : 40;
  const platformFee = 5;
  const gst = Math.round(itemTotal * 0.05);
  const grandTotal = itemTotal + deliveryFee + platformFee + gst;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    if (
      !addressDetails.address ||
      !addressDetails.city ||
      !addressDetails.pin ||
      !contactNumber
    ) {
      toast.error("Please fill in all delivery details");
      return;
    }

    if (!restaurant?._id) {
      toast.error("Restaurant information missing");
      return;
    }

    setIsPlacing(true);
    const loadingToast = toast.loading("Processing your order...");

    try {
      const orderData = {
        restaurantID: restaurant._id,
        items: cartItems.map((item) => ({
          menuItemID: item._id,
          itemName: item.itemName,
          quantity: item.qty,
          price: item.price,
        })),
        deliveryAddress: addressDetails,
        contactNumber: contactNumber,
        totalAmount: grandTotal,
      };

      const response = await api.post("/order/create", orderData);

      if (response.data.success) {
        toast.dismiss(loadingToast);
        setOrderSuccess(true);
        clearCart();
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Internal Server Error");
    } finally {
      setIsPlacing(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <Loader />
      </div>
    );

  if (orderSuccess)
    return <SuccessView onContinue={() => setOrderSuccess(false)} />;

  if (cartItems.length === 0) return <EmptyCartView />;

  return (
    <div className="min-h-screen bg-rose-50 font-poppins flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8 font-outfit text-gray-900 text-center md:text-left">
          Secure Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            {/* 1. ORDER SUMMARY */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 transition-all hover:shadow-md">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                  <ShoppingBag className="text-rose-500" size={22} /> Order
                  Summary
                </h2>
                <button
                  onClick={clearCart}
                  className="text-rose-600 text-xs font-bold hover:bg-rose-100 px-3 py-2 rounded-xl transition-all cursor-pointer active:scale-95"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <CartItemRow
                    key={item._id}
                    item={item}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item._id)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-6 transition-all hover:shadow-md">
              <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <MapPin className="text-rose-500" size={22} /> Delivery Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <InputGroup
                  label="Contact Number"
                  icon={<Phone size={18} />}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="e.g. 9876543210"
                />
                <InputGroup
                  label="Street / Area"
                  icon={<Building size={18} />}
                  value={addressDetails.address}
                  onChange={handleAddressChange}
                  name="address"
                  placeholder="House no, Street"
                />
                <InputGroup
                  label="City"
                  icon={<Navigation size={18} />}
                  value={addressDetails.city}
                  onChange={handleAddressChange}
                  name="city"
                  placeholder="City Name"
                />
                <InputGroup
                  label="Pincode"
                  icon={<MapPin size={18} />}
                  value={addressDetails.pin}
                  onChange={handleAddressChange}
                  name="pin"
                  placeholder="6-digit PIN"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 sticky top-28 transition-transform">
              <h3 className="font-bold text-gray-900 mb-6 font-outfit text-xl">
                Bill Summary
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Item Total</span>
                  <span className="font-bold text-gray-900">₹{itemTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-green-600 font-outfit">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-bold text-gray-900 font-outfit">
                    ₹{platformFee}
                  </span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-4 font-black text-gray-900 text-xl font-outfit">
                  <span>To Pay</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isPlacing}
                className={`w-full mt-8 py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group ${isPlacing ? "bg-gray-400" : "bg-gray-900 hover:bg-black hover:translate-y-0.5 active:scale-95"}`}
              >
                {isPlacing ? (
                  "Processing..."
                ) : (
                  <>
                    Pay & Place Order{" "}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-green-500" /> 100% Secure
                Checkout
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const InputGroup = ({ label, icon, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest group-focus-within:text-rose-500 transition-colors">
      {label}
    </label>
    <div className="flex items-center gap-3 border border-gray-100 rounded-2xl p-4 bg-gray-50/50 focus-within:bg-white focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/10 transition-all cursor-text">
      <span className="text-gray-400 group-focus-within:text-rose-500 transition-colors">
        {icon}
      </span>
      <input
        {...props}
        className="bg-transparent w-full outline-none text-sm font-medium text-gray-800"
      />
    </div>
  </div>
);

const CartItemRow = ({ item, onAdd, onRemove }) => (
  <div className="flex justify-between items-center bg-gray-50/30 p-3 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-white transition-all group">
    <div className="flex gap-4 items-center">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={item.image || item.photo?.url || "https://placehold.co/100"}
          className="w-16 h-16 object-cover transition-transform group-hover:scale-110"
          alt={item.itemName}
        />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900 line-clamp-1">
          {item.itemName}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onRemove}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:text-rose-600 hover:border-rose-600 transition-all cursor-pointer active:scale-90"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-black w-4 text-center">{item.qty}</span>
          <button
            onClick={onAdd}
            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-lg hover:text-rose-600 hover:border-rose-600 transition-all cursor-pointer active:scale-90"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="font-black text-sm text-gray-900">
        ₹{item.price * item.qty}
      </p>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">
        ₹{item.price} each
      </p>
    </div>
  </div>
);

const SuccessView = ({ onContinue }) => (
  <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
      <CheckCircle2 size={48} className="text-green-600" />
    </div>
    <h2 className="text-3xl font-bold font-outfit text-gray-900 mb-2">
      Order Confirmed!
    </h2>
    <p className="text-gray-500 mb-8 max-w-sm">
      The restaurant has received your request and started cooking!
    </p>
    <button
      onClick={onContinue}
      className="px-10 py-3 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
    >
      Back to Cart
    </button>
  </div>
);

const EmptyCartView = () => (
  <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4">
    <UtensilsCrossed size={80} className="text-gray-200 mb-6 animate-pulse" />
    <h2 className="text-2xl font-bold text-gray-900 font-outfit mb-2 text-center">
      Your cart is empty!
    </h2>
    <Link
      to="/"
      className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold shadow-lg shadow-rose-200 mt-6 transition-all hover:scale-105 active:scale-95 cursor-pointer"
    >
      Browse Restaurants
    </Link>
  </div>
);

const Loader = () => (
  <div className="w-12 h-12 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin"></div>
);

export default Cart;
