import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { User, Mail, Phone, Lock, Loader2, ArrowRight } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
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

    if (formData.fullName.length < 3) {
      newErrors.fullName = "Name must be at least 3 characters";
    } else if (!/^[A-Za-z\s]+$/.test(formData.fullName)) {
      newErrors.fullName = "Name can only contain letters and spaces";
    }

    if (
      !/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co\.in)$/.test(
        formData.email
      )
    ) {
      newErrors.email = "Please use a valid email (Gmail, Outlook, Yahoo)";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit Indian mobile number";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const res = await api.post("/auth/register", formData);
      toast.success(res.data.message || "Registration successful!");
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
          <h2 className="text-3xl font-bold text-white mb-2">Join Savora</h2>
          <p className="text-rose-100">
            Create an account to satisfy your cravings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="space-y-4">
            {/* Full Name */}
            <div className="relative">
              <User
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.fullName)}
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.email)}
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Mobile Number */}
            <div className="relative">
              <Phone
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.mobileNumber)}
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                maxLength="10"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.password)}
                type="password"
                name="password"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                className={getInputClass(errors.confirmPassword)}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1 ml-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-rose-200 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Creating
                Account...
              </>
            ) : (
              <>
                Register <ArrowRight size={20} />
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-rose-600 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
