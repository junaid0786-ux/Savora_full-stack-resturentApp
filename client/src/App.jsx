import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/dashboards/UserDashboard";

const AppContent = () => {
  const location = useLocation();

  const hideHeaderRoutes = ["/user-dashboard"];

  const showHeader = !hideHeaderRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      {showHeader && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
