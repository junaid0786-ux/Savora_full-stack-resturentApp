import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Shield,
  CreditCard,
  LogOut,
  Edit2,
  CheckCircle,
  X,
  Wallet,
  Calendar,
  Star,
} from "lucide-react";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: "Junaid Khan",
    email: "junaidkhan@gmail.com",
    phone: "+91 0000000000",
    role: "User",
    address: "Popular Compound Mallital, Nainital",
    bio: "Passionate foodie. Loves exploring spicy cuisines.",
    memberSince: "28 Nov",
    wallet: "₹0.00",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl h-full animate-fade-in text-(--text-main) overflow-hidden">
      <div className="border-b border-gray-100 pb-4 flex items-center w-full justify-between ">
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
              <div className="w-28 h-28 rounded-full border-[5px] border-white/20 shadow-inner bg-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
                <span className="text-4xl font-bold text-white font-brand">
                  JK
                </span>
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>

            <h2 className="text-2xl font-bold font-brand z-10">
              {formData.name}
            </h2>
            <p className="text-white/80 text-sm mb-6 z-10 font-medium">
              {formData.email}
            </p>

            <div className="grid grid-cols-2 gap-3 w-full z-10">
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
                <p className="text-2xl font-bold font-brand">
                  {formData.wallet}
                </p>
                <p className="text-[10px] uppercase tracking-wider opacity-80 font-bold flex items-center justify-center gap-1">
                  <Wallet size={10} /> Wallet
                </p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md border border-white/10">
                <p className="text-2xl font-bold font-brand">850</p>
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
              <button className="flex items-center gap-3 p-3 rounded-xl text-rose-600 hover:bg-red-50 transition-colors font-medium text-sm font-brand text-left mt-2">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </div>

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
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 font-brand uppercase tracking-wide
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
                    <User
                      className={`absolute left-4 top-3.5 transition-colors ${isEditing ? "text-(--color-primary)" : "text-gray-400"}`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium font-poppins
                         ${
                           isEditing
                             ? "bg-white border-gray-200 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
                             : "bg-(--bg-main) border-transparent text-gray-600"
                         }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <div className="relative group">
                    <Phone
                      className={`absolute left-4 top-3.5 transition-colors ${isEditing ? "text-(--color-primary)" : "text-gray-400"}`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium font-poppins
                         ${
                           isEditing
                             ? "bg-white border-gray-200 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
                             : "bg-(--bg-main) border-transparent text-gray-600"
                         }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <div className="relative group">
                    <Mail
                      className={`absolute left-4 top-3.5 transition-colors ${isEditing ? "text-(--color-primary)" : "text-gray-400"}`}
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium font-poppins
                         ${
                           isEditing
                             ? "bg-white border-gray-200 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
                             : "bg-(--bg-main) border-transparent text-gray-600"
                         }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Location
                  </label>
                  <div className="relative group">
                    <MapPin
                      className={`absolute left-4 top-3.5 transition-colors ${isEditing ? "text-(--color-primary)" : "text-gray-400"}`}
                      size={18}
                    />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium font-poppins text-ellipsis
                         ${
                           isEditing
                             ? "bg-white border-gray-200 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
                             : "bg-(--bg-main) border-transparent text-gray-600"
                         }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Member Since
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-4 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      value={formData.memberSince}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-transparent bg-(--bg-main) text-gray-500 text-sm font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <label className="block text-xs font-bold text-(--text-muted) uppercase tracking-wider mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all text-sm font-medium font-poppins resize-none
                       ${
                         isEditing
                           ? "bg-white border-gray-200 focus:border-(--color-primary) focus:ring-2 focus:ring-(--color-primary)/10"
                           : "bg-(--bg-main) border-transparent text-gray-600"
                       }`}
                  />
                </div>
              </form>
            </div>

            {isEditing && (
              <div className="p-6 border-t border-gray-100 bg-(--bg-main)/30 flex justify-end gap-3 shrink-0 animate-fade-in">
                <button
                  onClick={() => setIsEditing(false)}
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-(--text-muted) hover:bg-gray-100 transition-colors font-brand"
                >
                  Discard
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="px-8 py-2.5 rounded-xl text-sm font-bold bg-(--color-primary) text-white hover:bg-(--color-hover) shadow-lg shadow-(--color-primary)/20 transition-all flex items-center gap-2 font-brand disabled:opacity-70"
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
