import React, { useEffect, useState } from "react";

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
