import React, { useState } from "react";
import toast from "react-hot-toast";
import api from "../config/Api";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    message: "",
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

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.number || formData.number.length < 10)
      newErrors.number = "Invalid mobile number";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await api.post("/auth/contact", formData);
      toast.success("Message sent successfully!");
      setFormData({ fullName: "", email: "", number: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (errorField) => {
    return `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
      errorField
        ? "border-red-500 ring-red-200"
        : "border-black focus:border-rose-500 focus:ring-rose-200"
    }`;
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center p-4 sm:p-8 font-sans">
      <div className="max-w-5xl w-full bg-gray-100 rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="bg-rose-600 text-white p-10 flex flex-col justify-between relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <p className="text-rose-100 mb-8">
              Fill up the form and our team will get back to you within 24
              hours.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-rose-200" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-rose-200" />
                <span>support@example.com</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-rose-200" />
                <span>123 Tech Street, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className={getInputClass(errors.fullName)}
                type="text"
                name="fullName"
                placeholder="enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className={getInputClass(errors.email)}
                type="email"
                name="email"
                placeholder="enter your e-mail"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                className={getInputClass(errors.number)}
                type="number"
                name="number"
                placeholder="enter your mobile number"
                value={formData.number}
                onChange={handleChange}
              />
              {errors.number && (
                <p className="text-red-500 text-xs mt-1">{errors.number}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                className={`${getInputClass(errors.message)} h-32 resize-none`}
                name="message"
                placeholder="write youre message here..."
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full flex justify-center items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-md shadow-rose-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Sending...
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
