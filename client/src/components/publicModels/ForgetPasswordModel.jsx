import React, { useState } from "react";
import { Mail, KeyRound, Lock, X } from "lucide-react";
import api from "../../config/Api";
import toast from "react-hot-toast";

const ForgetPasswordModel = ({ onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (step === 1) {
        await api.post("/auth/genOtp", { email: formData.email });
        toast.success("OTP sent successfully");
        setStep(2);
      }

      if (step === 2) {
        await api.post("/auth/verifyOtp", {
          email: formData.email,
          otp: formData.otp,
        });
        toast.success("OTP verified");
        setStep(3);
      }

      if (step === 3) {
        if (formData.newPassword !== formData.confirmNewPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        await api.post("/auth/forgetPasword", {
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        });

        toast.success("Password reset successful");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-rose-600 p-6 text-center relative">
          <h2 className="text-2xl font-bold text-white">
            Reset Your Password
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:opacity-80"
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {step === 1 && (
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-300"
              />
            </div>
          )}

          {step === 2 && (
            <div className="relative">
              <KeyRound
                className="absolute left-3 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="otp"
                value={formData.otp}
                onChange={handleChange}
                placeholder="Enter OTP"
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-300"
              />
            </div>
          )}

          {step === 3 && (
            <>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New password"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div className="relative">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={20}
                />
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-rose-300"
                />
              </div>
            </>
          )}

          <button
            disabled={loading}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-70"
          >
            {loading
              ? "Please wait..."
              : step === 1
              ? "Send OTP"
              : step === 2
              ? "Verify OTP"
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordModel;
