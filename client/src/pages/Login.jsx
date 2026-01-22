import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setUser, setIsLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await api.post("/auth/login", formData);

      if (res.data) {
        toast.success(res.data.message || "Login Successful!");
        const userData = res.data.data || res.data.user;
        sessionStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsLogin(true);

        navigate("/user-dashboard");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (errorField) => {
    return `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
      errorField
        ? "border-red-500 ring-red-200"
        : "border-black focus:border-rose-500 focus:ring-rose-200"
    }`;
  };

  return (
    <div className="h-[90vh] bg-rose-50 flex justify-center items-center p-4 font-sans select-none">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-rose-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-rose-100">Login to continue your Savora journey</p>
        </div>

        <form className="p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.email)}
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.password)}
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 flex justify-center items-center gap-2 shadow-md shadow-rose-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Logging in...
              </>
            ) : (
              <>
                <LogIn size={20} /> Login
              </>
            )}
          </button>

          <div className="flex justify-between items-center text-sm mt-2">
            <p className="text-gray-600">
              New here?
              <span className="ml-1">
                <Link
                  to="/register"
                  className="text-rose-600 font-bold hover:text-rose-800 hover:underline"
                >
                  Register
                </Link>
              </span>
            </p>

            <div className="text-gray-500 hover:text-rose-600 font-medium hover:underline transition-colors">
              Forgot Password?
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
