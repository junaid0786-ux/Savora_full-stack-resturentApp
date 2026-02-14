import React, { useEffect, useState } from "react";
import { socket } from "../config/socket.js";
const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null,
  );
  const [isLogin, setIsLogin] = useState(!!user);
  const [role, setRole] = useState(user?.role || null);

  useEffect(() => {
    setIsLogin(!!user);
    setRole(user?.role || null);

    if (user) {
      if (!socket.connected) {
        socket.connect();
      }

      if (user._id) {
        socket.emit("join_room", user._id);
      }

      if (user.restaurantId) {
        socket.emit("join_room", user.restaurantId);
      }
    } else {
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [user]);
  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    setIsLogin(false);
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
