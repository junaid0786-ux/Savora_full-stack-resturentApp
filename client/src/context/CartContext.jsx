import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isLogin } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    const savedItems = localStorage.getItem("savora_cart");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [restaurant, setRestaurant] = useState(() => {
    const savedRest = localStorage.getItem("savora_cart_rest");
    return savedRest ? JSON.parse(savedRest) : null;
  });

  useEffect(() => {
    localStorage.setItem("savora_cart", JSON.stringify(cartItems));
    localStorage.setItem("savora_cart_rest", JSON.stringify(restaurant));
  }, [cartItems, restaurant]);

  const addToCart = (item, currentRestaurant) => {
    const toastId = "cart-action";

    if (!isLogin) {
      return toast.error("Please login to add items", { id: toastId });
    }

    if (
      restaurant &&
      currentRestaurant &&
      restaurant._id !== currentRestaurant._id &&
      cartItems.length > 0
    ) {
      const confirmSwitch = window.confirm(
        `Your cart has items from ${restaurant.restaurantName}. Reset cart for ${currentRestaurant.restaurantName}?`,
      );

      if (confirmSwitch) {
        setCartItems([{ ...item, qty: 1 }]);
        setRestaurant(currentRestaurant);
        toast.success(
          `Started new cart at ${currentRestaurant.restaurantName}`,
          { id: toastId },
        );
      }
      return;
    }

    if (!restaurant || cartItems.length === 0) {
      if (currentRestaurant) setRestaurant(currentRestaurant);
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        toast.success(`Increased ${item.itemName} quantity`, { id: toastId });
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i,
        );
      } else {
        toast.success(`${item.itemName} added to cart`, { id: toastId });
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    const toastId = "cart-action";

    setCartItems((prev) => {
      const itemToUpdate = prev.find((i) => i._id === itemId);
      if (!itemToUpdate) return prev;

      if (itemToUpdate.qty === 1) {
        toast.success("Item removed from cart", { id: toastId });
        const newCart = prev.filter((i) => i._id !== itemId);
        if (newCart.length === 0) setRestaurant(null);
        return newCart;
      }

      toast.success("Reduced item quantity", { id: toastId });
      return prev.map((i) => (i._id === itemId ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    toast.success("Cart cleared", { id: "cart-action" });
  };

  const getCartCount = () => cartItems.reduce((acc, item) => acc + item.qty, 0);
  const getCartTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const value = {
    cartItems,
    restaurant,
    addToCart,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
