import React, { useState, useEffect } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  Calendar,
  Wallet,
  Globe,
  Loader2,
  ImagePlus,
  LayoutDashboard,
} from "lucide-react";

const ProfileField = ({
  label,
  name,
  value,
  section,
  icon: Icon,
  type = "text",
  disabled = false,
  isEditing,
  onChange,
}) => {
  const isValEmpty = !value || value === "N/A";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 border-b border-gray-100 last:border-0 gap-4 hover:bg-gray-50/50 transition-colors rounded-lg">
      <div className="flex items-center gap-3 w-1/3 min-w-37.5">
        <div
          className={`p-2 rounded-lg ${isEditing ? "bg-rose-50 text-rose-600" : "bg-gray-100 text-gray-500"}`}
        >
          {Icon && <Icon size={18} />}
        </div>
        <span className="text-gray-600 font-bold text-xs uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div className="flex-1 w-full">
        {isEditing && !disabled ? (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={(e) => onChange(e, section)}
            placeholder={`Enter ${label}`}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 focus:outline-none transition-all shadow-sm"
          />
        ) : (
          <span
            className={`text-sm font-medium break-all ${isValEmpty ? "text-gray-400 italic" : "text-gray-900"}`}
          >
            {isValEmpty ? "Not provided" : value}
          </span>
        )}
      </div>
    </div>
  );
};

const RestaurantProfile = () => {
  const { user: authUser, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    restaurantName: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    cuisine: "",
    role: "",
    isActive: "",
    dob: "",
    gender: "",
    createdAt: "",
    _id: "",
    address: "",
    city: "",
    pin: "",
    geoLocation: { lat: "", lon: "" },
    paymentDetails: { upi: "", account_number: "", ifs_Code: "" },
    documents: { gst: "", fssai: "", pan: "", rc: "", dl: "", uidai: "" },
  });

  const [imagePreview, setImagePreview] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [coverPreview, setCoverPreview] = useState("");
  const [selectedCover, setSelectedCover] = useState(null);

  useEffect(() => {
    if (authUser) {
      loadProfileFromContext(authUser);
    } else {
      setLoading(false);
    }
  }, [authUser]);

  const sanitize = (val) =>
    val === "N/A" || val === null || val === undefined ? "" : val;

  const loadProfileFromContext = (userData) => {
    setImagePreview(userData.photo?.url || "");
    setCoverPreview(userData.coverPhoto?.url || "");

    setFormData({
      restaurantName: sanitize(userData.restaurantName),
      fullName: sanitize(userData.fullName),
      email: sanitize(userData.email),
      mobileNumber: sanitize(userData.mobileNumber),
      cuisine: sanitize(userData.cuisine),
      role: userData.role || "partner",
      isActive: userData.isActive || "active",
      dob: sanitize(userData.dob),
      gender: sanitize(userData.gender),
      createdAt: userData.createdAt || "",
      _id: userData._id || "",
      address: sanitize(userData.address),
      city: sanitize(userData.city),
      pin: sanitize(userData.pin),
      geoLocation: {
        lat: sanitize(userData.geoLocation?.lat),
        lon: sanitize(userData.geoLocation?.lon),
      },
      paymentDetails: {
        upi: sanitize(userData.paymentDetails?.upi),
        account_number: sanitize(userData.paymentDetails?.account_number),
        ifs_Code: sanitize(userData.paymentDetails?.ifs_Code),
      },
      documents: {
        gst: sanitize(userData.documents?.gst),
        fssai: sanitize(userData.documents?.fssai),
        pan: sanitize(userData.documents?.pan),
        rc: sanitize(userData.documents?.rc),
        dl: sanitize(userData.documents?.dl),
        uidai: sanitize(userData.documents?.uidai),
      },
    });
  };

  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image must be under 2MB");
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Cover image must be under 5MB");
        return;
      }
      setCoverPreview(URL.createObjectURL(file));
      setSelectedCover(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setSelectedCover(null);
    if (authUser) {
      loadProfileFromContext(authUser);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] !== "object") {
          dataToSend.append(key, formData[key] || "N/A");
        }
      });

      dataToSend.append("geoLocation", JSON.stringify(formData.geoLocation));
      dataToSend.append(
        "paymentDetails",
        JSON.stringify(formData.paymentDetails),
      );
      dataToSend.append("documents", JSON.stringify(formData.documents));

      if (selectedFile) {
        dataToSend.append("profilePic", selectedFile);
      }
      if (selectedCover) {
        dataToSend.append("coverImage", selectedCover);
      }

      const response = await api.put("/auth/update-profile", dataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully");
      setIsEditing(false);
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="animate-spin text-rose-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 font-sans animate-fade-in">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="relative group h-48 md:h-64 w-full bg-gray-100 overflow-hidden">
            {coverPreview ? (
              <img
                src={coverPreview}
                className="w-full h-full object-cover"
                alt="Cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 bg-linear-to-br from-gray-50 to-gray-100">
                <ImagePlus size={48} />
                <span className="text-sm font-medium mt-2">No Cover Image</span>
              </div>
            )}

            {isEditing && (
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <label className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-2.5 rounded-full cursor-pointer hover:bg-white/30 transition-all font-bold text-sm flex items-center gap-2">
                  <Camera size={18} /> Change Cover
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleCoverChange}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-end -mt-12 mb-4 gap-6">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-white shadow-lg bg-white overflow-hidden p-1">
                  <img
                    src={imagePreview || "https://ui-avatars.com/api/?name=R"}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-2xl bg-gray-50"
                  />
                </div>
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-gray-900 text-white p-2.5 rounded-xl cursor-pointer shadow-lg hover:bg-black transition-all hover:scale-105 active:scale-95">
                    <Camera size={16} />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 pb-2 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-900 font-outfit">
                  {formData.restaurantName || "Restaurant Name"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100 text-xs font-bold uppercase tracking-wide">
                    <LayoutDashboard size={14} /> {formData.role}
                  </div>
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${formData.isActive === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}`}
                  >
                    {formData.isActive === "active" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}{" "}
                    {formData.isActive}
                  </div>
                </div>
              </div>

              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg hover:bg-black transition-all active:scale-95 mb-2"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="md:hidden w-full mb-6 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm shadow-lg"
          >
            <Edit2 size={18} /> Edit Profile
          </button>
        )}

        <div className="space-y-6">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                <Store size={18} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 font-outfit">
                General Information
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <ProfileField
                label="Owner Name"
                name="fullName"
                value={formData.fullName}
                icon={User}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Restaurant Name"
                name="restaurantName"
                value={formData.restaurantName}
                icon={Store}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Cuisine Type"
                name="cuisine"
                value={formData.cuisine}
                icon={Store}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Phone Number"
                name="mobileNumber"
                value={formData.mobileNumber}
                icon={Phone}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Founded / DOB"
                name="dob"
                value={formData.dob}
                type="date"
                icon={Calendar}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Gender"
                name="gender"
                value={formData.gender}
                icon={User}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Email Address"
                name="email"
                value={formData.email}
                icon={Mail}
                disabled={true}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin size={18} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 font-outfit">
                Location Details
              </h2>
            </div>
            <div className="p-6">
              <ProfileField
                label="Street Address"
                name="address"
                value={formData.address}
                icon={MapPin}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                <ProfileField
                  label="City"
                  name="city"
                  value={formData.city}
                  icon={Building2}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Pincode"
                  name="pin"
                  value={formData.pin}
                  icon={MapPin}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Latitude"
                  name="lat"
                  value={formData.geoLocation.lat}
                  section="geoLocation"
                  icon={Globe}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Longitude"
                  name="lon"
                  value={formData.geoLocation.lon}
                  section="geoLocation"
                  icon={Globe}
                  isEditing={isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                <FileText size={18} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 font-outfit">
                Legal Documents
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <ProfileField
                label="GST Number"
                name="gst"
                value={formData.documents.gst}
                section="documents"
                icon={FileText}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="FSSAI License"
                name="fssai"
                value={formData.documents.fssai}
                section="documents"
                icon={CheckCircle2}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="PAN Number"
                name="pan"
                value={formData.documents.pan}
                section="documents"
                icon={CreditCard}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Registration (RC)"
                name="rc"
                value={formData.documents.rc}
                section="documents"
                icon={FileText}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Driving License"
                name="dl"
                value={formData.documents.dl}
                section="documents"
                icon={User}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Aadhar (UIDAI)"
                name="uidai"
                value={formData.documents.uidai}
                section="documents"
                icon={User}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                <Wallet size={18} />
              </div>
              <h2 className="text-lg font-bold text-gray-800 font-outfit">
                Banking & Payments
              </h2>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <ProfileField
                label="UPI ID"
                name="upi"
                value={formData.paymentDetails.upi}
                section="paymentDetails"
                icon={Phone}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="Account Number"
                name="account_number"
                value={formData.paymentDetails.account_number}
                section="paymentDetails"
                icon={CreditCard}
                isEditing={isEditing}
                onChange={handleChange}
              />
              <ProfileField
                label="IFSC Code"
                name="ifs_Code"
                value={formData.paymentDetails.ifs_Code}
                section="paymentDetails"
                icon={Building2}
                isEditing={isEditing}
                onChange={handleChange}
              />
            </div>
          </section>
        </div>
      </div>

      {isEditing && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 animate-in slide-in-from-bottom-5">
          <div className="max-w-7xl mx-auto flex items-center justify-end gap-3">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="px-8 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg flex items-center gap-2"
            >
              {saving ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
