import React, { useEffect, useState } from "react";
import { socket } from "../config/socket";
import Cookies from "js-cookie"; // Ensure you have installed: npm install js-cookie

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null,
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user?.role || null);

  useEffect(() => {
    // 1. Sync state variables
    setIsLogin(!!user);
    setRole(user?.role || null);

    if (user) {
      // 2. GET THE TOKEN (Critical Step!)
      // Try sessionStorage first (where we saved it in Login), fallback to Cookie
      const token = sessionStorage.getItem("socket_token") || Cookies.get("Oreo");

      if (!token) {
        console.warn("⚠️ User logged in but No Token found for Socket.");
        return;
      }

      // 3. Attach Token to Socket Auth
      socket.auth = { token };

      // 4. Connect explicitly
      if (!socket.connected) {
        socket.connect();
      }

      // 5. Listen for Successful Connection
      const onConnect = () => {
        console.log("🟢 Socket Connected! ID:", socket.id);

        // Join the user's private room (Works for both Customers & Managers)
        if (user._id) {
          socket.emit("join_room", user._id);
          console.log(`✨ Joined Room: ${user._id}`);
        }

        // If you still use a separate restaurantId field, join that too
        if (user.restaurantId) {
          socket.emit("join_room", user.restaurantId);
        }
      };

      // 6. Listen for Connection Errors (Debugging)
      const onConnectError = (err) => {
        console.error("🔴 Socket Connection Failed:", err.message);
      };

      socket.on("connect", onConnect);
      socket.on("connect_error", onConnectError);

      // Cleanup function to remove listeners when user changes
      return () => {
        socket.off("connect", onConnect);
        socket.off("connect_error", onConnectError);
      };
    } else {
      // 7. Disconnect on Logout
      if (socket.connected) {
        socket.disconnect();
        console.log("🔴 Socket Disconnected");
      }
    }
  }, [user]);

  const logout = () => {
    // Clear all storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("socket_token"); // Remove the socket token
    Cookies.remove("Oreo");
    
    // Reset State
    setUser(null);
    setIsLogin(false);
    
    // Disconnect immediately
    if (socket.connected) socket.disconnect();
  };

  const value = {
    user,
    setUser,
    isLogin,
    setIsLogin,
    logout,
    role,
    setRole,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};