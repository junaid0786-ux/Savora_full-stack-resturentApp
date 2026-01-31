import React from "react";
import { useState } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";

const ForgetPasswordModel = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(true);
  const [verifiedOTP, setVerifiedOTP] = useState(true);

  const onClose = () => {
    setIsOTPSent(false);
    setVerifiedOTP(false);
    setFormData({
      email: "",
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isOTPSent) {
        console.log("Sending OTP to", formData.email);
        setIsOTPSent(true);

      } else if (isOTPSent && !verifiedOTP) {
        console.log("Verifying OTP", formData.otp);
        setVerifiedOTP(true);
        
      } else if (verifiedOTP) {
        console.log("Resetting password to", formData.newPassword);
        onClose();
      }
    } catch (error) {
      console.error("Error during form submission", error);
    }
    console.log("submitting", formData);
  };
  return (
    <div>
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Forget Password
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isOTPSent && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            {isOTPSent && !verifiedOTP && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            {verifiedOTP && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmNewPassword: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
              {loading
                ? "Submitting..."
                : isOTPSent
                  ? verifiedOTP
                    ? "Reset Password"
                    : "Verify OTP"
                  : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordModel;
