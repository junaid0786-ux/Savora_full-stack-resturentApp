import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, isLogin } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("savora_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [restaurant, setRestaurant] = useState(() => {
    const savedRest = localStorage.getItem("savora_restaurant");
    return savedRest ? JSON.parse(savedRest) : null;
  });

  useEffect(() => {
    localStorage.setItem("savora_cart", JSON.stringify(cartItems));
    localStorage.setItem("savora_restaurant", JSON.stringify(restaurant));
  }, [cartItems, restaurant]);

  useEffect(() => {
    if (!isLogin) {
      setCartItems([]);
      setRestaurant(null);
      localStorage.removeItem("savora_cart");
      localStorage.removeItem("savora_restaurant");
    }
  }, [isLogin]);

  const addToCart = (item, currentRestaurant) => {
    if (
      restaurant &&
      restaurant._id !== currentRestaurant._id &&
      cartItems.length > 0
    ) {
      const confirmSwitch = window.confirm(
        `Your cart contains items from "${restaurant.title}". Reset your cart to add items from "${currentRestaurant.title}"?`,
      );

      if (confirmSwitch) {
        clearCart();
        setRestaurant(currentRestaurant);
        setCartItems([{ ...item, qty: 1 }]);
        toast.success(`Started new order at ${currentRestaurant.title}`);
      }
      return;
    }

    if (cartItems.length === 0) {
      setRestaurant(currentRestaurant);
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        toast.success(`Increased quantity of ${item.name}`);
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      toast.success(`Added ${item.name} to cart`);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === itemId);

      if (existing.qty === 1) {
        const newCart = prev.filter((i) => i._id !== itemId);
        if (newCart.length === 0) setRestaurant(null);
        return newCart;
      }

      return prev.map((i) => (i._id === itemId ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurant(null);
    localStorage.removeItem("savora_cart");
    localStorage.removeItem("savora_restaurant");
    toast.success("Cart cleared");
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const value = {
    cartItems,
    restaurant,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
