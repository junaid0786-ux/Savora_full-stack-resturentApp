import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../config/Api";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Loader2, 
  ArrowRight, 
  ChefHat, 
  Bike, 
  ShieldCheck, 
  CheckCircle2 
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "customer",
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

    if (!/^[\w\.]+@(gmail|outlook|ricr|yahoo)\.(com|in|co\.in)$/.test(formData.email)) {
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

    if (!formData.role) {
      newErrors.role = "Please select a role";
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
        role: "customer",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (errorField) => {
    return `w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
      errorField
        ? "border-red-500 ring-red-200 bg-red-50"
        : "border-gray-200 bg-gray-50 focus:bg-white focus:border-rose-500 focus:ring-rose-200"
    }`;
  };

  const roles = [
    { id: "customer", label: "Customer", icon: User },
    { id: "manager", label: "Manager", icon: ChefHat },
    { id: "partner", label: "Partner", icon: Bike },
    { id: "admin", label: "Admin", icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-rose-50 flex justify-center items-center py-10 px-4 font-sans">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100/50">
        <div className="bg-rose-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl font-extrabold text-white mb-2 relative z-10 tracking-tight">
            Join Savora
          </h2>
          <p className="text-rose-100 font-medium relative z-10">
            Create an account to satisfy your cravings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  className={getInputClass(errors.fullName)}
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.fullName}</p>}
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  className={getInputClass(errors.mobileNumber)}
                  type="tel"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  maxLength="10"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
                {errors.mobileNumber && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.mobileNumber}</p>}
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                className={getInputClass(errors.email)}
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  className={getInputClass(errors.password)}
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.password}</p>}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  className={getInputClass(errors.confirmPassword)}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-gray-700 text-sm font-bold uppercase tracking-wider ml-1">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((roleItem) => {
                const isSelected = formData.role === roleItem.id;
                const Icon = roleItem.icon;
                return (
                  <label
                    key={roleItem.id}
                    className={`relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
                      ${isSelected 
                        ? "border-rose-500 bg-rose-50 text-rose-700 shadow-sm ring-1 ring-rose-200" 
                        : "border-gray-100 bg-gray-50 text-gray-500 hover:bg-white hover:border-rose-200"
                      }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={roleItem.id}
                      checked={isSelected}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <div className={`p-2 rounded-full ${isSelected ? "bg-rose-100 text-rose-600" : "bg-gray-200 text-gray-500"}`}>
                      <Icon size={18} />
                    </div>
                    <span className="font-bold text-sm">{roleItem.label}</span>
                    
                    {isSelected && (
                      <CheckCircle2 className="absolute top-2 right-2 text-rose-500" size={16} />
                    )}
                  </label>
                );
              })}
            </div>
            {errors.role && <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.role}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-rose-200 hover:shadow-rose-300"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Creating Account...
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
              className="text-rose-600 font-bold hover:text-rose-700 hover:underline transition-colors"
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