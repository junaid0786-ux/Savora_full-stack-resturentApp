import React, { useEffect, useState } from "react";
import { socket } from "../config/socket.js";
import Cookies from "js-cookie";

const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || "",
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user?.role || "");

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user?.role || "");

    if (user) {
      const token =
        sessionStorage.getItem("socket_token") || Cookies.get("Oreo");

      if (!token) {
        console.warn("User logged in but No Token found for Socket.");
        return;
      }

      socket.auth = { token };

      if (!socket.connected) {
        socket.connect();
      }

      const onConnect = () => {
        console.log("Socket Connected! ID:", socket.id);

        if (user._id) {
          socket.emit("join_room", user._id);
          console.log(`Joined Room: ${user._id}`);
        }

        if (user.restaurantId) {
          socket.emit("join_room", user.restaurantId);
        }
      };

      const onConnectError = (err) => {
        console.error("Socket Connection Failed:", err.message);
      };

      socket.on("connect", onConnect);
      socket.on("connect_error", onConnectError);

      return () => {
        socket.off("connect", onConnect);
        socket.off("connect_error", onConnectError);
      };
    } else {
      if (socket.connected) {
        socket.disconnect();
        console.log("Socket Disconnected");
      }
    }
  }, [user]);

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("socket_token");
    Cookies.remove("Oreo");

    setUser(null);
    setIsLogin(false);

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
