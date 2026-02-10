import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { isLogin } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("savora_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [restaurant, setRestaurant] = useState(() => {
    const saved = localStorage.getItem("savora_cart_rest");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("savora_cart", JSON.stringify(cartItems));
    localStorage.setItem("savora_cart_rest", JSON.stringify(restaurant));
  }, [cartItems, restaurant]);

  const addToCart = (item, currentRestaurant) => {
    if (!isLogin) {
      toast.error("Please login to add items to cart");
      return;
    }

    if (
      restaurant &&
      currentRestaurant &&
      restaurant._id !== currentRestaurant._id &&
      cartItems.length > 0
    ) {
      const confirmSwitch = window.confirm(
        `Your cart contains items from ${restaurant.restaurantName}. Reset cart to add items from ${currentRestaurant.restaurantName}?`,
      );
      if (confirmSwitch) {
        setCartItems([{ ...item, qty: 1 }]);
        setRestaurant(currentRestaurant);
        toast.success(`${item.itemName} added to cart`);
      }
      return;
    }

    if (!restaurant || cartItems.length === 0) {
      if (currentRestaurant) setRestaurant(currentRestaurant);
    }

    const existingItem = cartItems.find((i) => i._id === item._id);
    if (existingItem) {
      toast.success(`Quantity updated: ${item.itemName}`);
    } else {
      toast.success(`${item.itemName} added to cart`);
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === item._id);
      if (existing) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find((i) => i._id === itemId);
    if (!existingItem) return;

    if (existingItem.qty === 1) {
      toast.success("Item removed from cart");
    }

    setCartItems((prev) => {
      const existing = prev.find((i) => i._id === itemId);
      if (!existing) return prev;

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
    toast.success("Cart cleared");
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurant,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
