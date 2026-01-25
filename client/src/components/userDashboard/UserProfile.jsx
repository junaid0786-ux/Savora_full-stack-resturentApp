import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Shield,
  CreditCard,
  Edit2,
  CheckCircle,
  X,
  Wallet,
  Star,
  Calendar,
  Map,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import api from "../../config/Api";

const UserProfile = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    pin: "",
    wallet: 0,
    points: 0,
    photo: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        mobileNumber: user.mobileNumber || "",
        dob: user.dob === "N/A" ? "" : user.dob,
        gender: user.gender === "N/A" ? "" : user.gender,
        address: user.address === "N/A" ? "" : user.address,
        city: user.city === "N/A" ? "" : user.city,
        pin: user.pin === "N/A" ? "" : user.pin,
        wallet: user.wallet || 0,
        points: user.points || 0,
        photo: user.photo?.url || "",
      });
      setImagePreview(user.photo?.url || null);
    }
  }, [user]);

  const displayName = formData.fullName || "User";
  const initials = displayName.charAt(0).toUpperCase();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size is too large (max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const response = await api.put("/auth/update-profile", formData);

      if (response.data.success) {
        const updatedUser = { ...user, ...response.data.data };
        setUser(updatedUser);
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        toast.success(response.data.message || "Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = `w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium font-poppins ${
    isEditing
      ? "bg-white border-gray-300 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
      : "bg-gray-50 border-transparent text-gray-600 cursor-not-allowed"
  }`;

  const iconClasses = `absolute left-4 top-3.5 transition-colors ${
    isEditing ? "text-(--color-primary)" : "text-gray-400"
  }`;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl h-full animate-fade-in text-(--text-main) overflow-hidden">
      <div className="border-b border-gray-100 pb-4 flex items-center w-full justify-between">
        <p className="text-xl font-bold text-(--color-primary) tracking-widest uppercase mb-1 font-brand">
          Account
        </p>
        <h1 className="text-2xl font-bold tracking-tight font-brand">
          Profile Settings
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full pb-2 overflow-y-auto lg:overflow-visible">
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="bg-rose-600 rounded-2xl p-8 text-white shadow-lg shadow-(--color-primary)/30 flex flex-col items-center text-center relative overflow-hidden shrink-0">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white opacity-5 rotate-12 pointer-events-none"></div>

            <div className="relative mb-4 z-10 group cursor-pointer">
              <div className="w-28 h-28 rounded-full border-[5px] border-white/20 shadow-inner bg-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm relative">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white font-brand">
                    {initials}
                  </span>
                )}
              </div>

              <label
                htmlFor="image"
                className={`absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity ${isEditing ? "opacity-0 group-hover:opacity-100 cursor-pointer" : "hidden"}`}
              >
                <Camera className="text-white" size={24} />
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
              </label>
            </div>

            <h2 className="text-2xl font-bold font-brand z-10">
              {displayName}
            </h2>
            <p className="text-white/80 text-sm mb-6 z-10 font-medium">
              {formData.email}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full z-10">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
                <p className="text-2xl font-bold font-brand">
                  ₹{formData.wallet}
                </p>
                <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold flex items-center justify-center gap-1">
                  <Wallet size={10} /> Wallet
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
                <p className="text-2xl font-bold font-brand">
                  {formData.points}
                </p>
                <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold flex items-center justify-center gap-1">
                  <Star size={10} /> Points
                </p>
              </div>
            </div>
          </div>

          <div className="bg-(--bg-card) rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-100 bg-(--bg-main)/30">
              <h3 className="text-xs font-bold text-(--text-muted) uppercase tracking-wider">
                Account Menu
              </h3>
            </div>
            <div className="p-2 flex flex-col gap-1">
              <button className="flex items-center gap-3 p-3 rounded-xl bg-(--bg-main) text-(--color-primary) font-bold text-sm font-brand text-left">
                <User size={18} /> Personal Details
              </button>
              <button className="flex items-center gap-3 p-3 rounded-xl text-(--text-muted) hover:bg-(--bg-main) hover:text-(--text-main) transition-colors font-medium text-sm font-brand text-left">
                <Shield size={18} /> Security & Login
              </button>
              <button className="flex items-center gap-3 p-3 rounded-xl text-(--text-muted) hover:bg-(--bg-main) hover:text-(--text-main) transition-colors font-medium text-sm font-brand text-left">
                <CreditCard size={18} /> Saved Cards
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2 h-full flex flex-col">
          <div className="bg-(--bg-card) rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-(--bg-main)/30 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-(--color-primary)/10 rounded-lg text-(--color-primary)">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg font-brand">
                    General Information
                  </h3>
                  <p className="text-xs text-(--text-muted)">
                    Update your profile details below
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isEditing) {
                    setFormData({
                      ...user,
                      dob: user.dob === "N/A" ? "" : user.dob,
                      gender: user.gender === "N/A" ? "" : user.gender,
                      address: user.address === "N/A" ? "" : user.address,
                      city: user.city === "N/A" ? "" : user.city,
                      pin: user.pin === "N/A" ? "" : user.pin,
                      photo: user.photo?.url || "",
                    });
                    setImagePreview(user.photo?.url || null);
                  }
                  setIsEditing(!isEditing);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 font-brand uppercase tracking-wide cursor-pointer
                  ${
                    isEditing
                      ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      : "border border-(--color-primary) text-(--color-primary) hover:bg-(--color-primary) hover:text-white"
                  }`}
              >
                {isEditing ? (
                  <>
                    <X size={14} /> Cancel
                  </>
                ) : (
                  <>
                    <Edit2 size={14} /> Edit
                  </>
                )}
              </button>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className={iconClasses} size={18} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail className={iconClasses} size={18} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      className={`${inputClasses} cursor-not-allowed opacity-70`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <div className="relative group">
                    <Phone className={iconClasses} size={18} />
                    <input
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Date of Birth
                  </label>
                  <div className="relative group">
                    <Calendar className={iconClasses} size={18} />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Gender
                  </label>
                  <div className="relative group">
                    <User className={iconClasses} size={18} />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`${inputClasses} appearance-none`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Address
                  </label>
                  <div className="relative group">
                    <MapPin className={iconClasses} size={18} />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    City
                  </label>
                  <div className="relative group">
                    <Map className={iconClasses} size={18} />
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Pin Code
                  </label>
                  <div className="relative group">
                    <MapPin className={iconClasses} size={18} />
                    <input
                      type="text"
                      name="pin"
                      value={formData.pin}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </form>
            </div>

            {isEditing && (
              <div className="p-6 border-t border-gray-100 bg-(--bg-main)/30 flex justify-end gap-3 shrink-0 animate-fade-in">
                <button
                  onClick={() => {
                    setFormData({
                      ...user,
                      dob: user.dob === "N/A" ? "" : user.dob,
                      gender: user.gender === "N/A" ? "" : user.gender,
                      address: user.address === "N/A" ? "" : user.address,
                      city: user.city === "N/A" ? "" : user.city,
                      pin: user.pin === "N/A" ? "" : user.pin,
                      photo: user.photo?.url || "",
                    });
                    setImagePreview(user.photo?.url || null);
                    setIsEditing(false);
                  }}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-(--text-muted) hover:bg-gray-100 transition-colors font-brand cursor-pointer"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-(--color-primary) text-white hover:bg-(--color-hover) shadow-lg shadow-(--color-primary)/20 transition-all flex items-center gap-2 font-brand disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    "Saving..."
                  ) : (
                    <>
                      <CheckCircle size={18} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
