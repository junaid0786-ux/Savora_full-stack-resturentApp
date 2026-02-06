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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-1 border-b border-gray-100 last:border-0 gap-2">
      <div className="flex items-center gap-3 w-1/3 min-w-37.5">
        {Icon && <Icon size={16} className="text-gray-400 shrink-0" />}
        <span className="text-gray-600 font-medium text-sm">{label}</span>
      </div>

      <div className="flex-1 w-full">
        {isEditing && !disabled ? (
          <input
            type={type}
            name={name}
            value={value || ""}
            onChange={(e) => onChange(e, section)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:bg-white focus:border-rose-500 focus:outline-none transition-colors"
          />
        ) : (
          <span
            className={`text-sm font-semibold break-all ${
              isValEmpty ? "text-gray-400 italic" : "text-gray-900"
            }`}
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

  useEffect(() => {
    if (authUser) {
      loadProfileFromContext(authUser);
    } else {
      setLoading(false);
    }
  }, [authUser]);

  const loadProfileFromContext = (userData) => {
    setImagePreview(userData.photo?.url || "");

    setFormData({
      restaurantName: userData.restaurantName || "",
      fullName: userData.fullName || "",
      email: userData.email || "",
      mobileNumber: userData.mobileNumber || "",
      cuisine: userData.cuisine || "",
      role: userData.role || "partner",
      isActive: userData.isActive || "active",
      dob: userData.dob || "",
      gender: userData.gender || "",
      createdAt: userData.createdAt || "",
      _id: userData._id || "",
      address: userData.address || "",
      city: userData.city || "",
      pin: userData.pin || "",
      geoLocation: {
        lat: userData.geoLocation?.lat || "",
        lon: userData.geoLocation?.lon || "",
      },
      paymentDetails: {
        upi: userData.paymentDetails?.upi || "",
        account_number: userData.paymentDetails?.account_number || "",
        ifs_Code: userData.paymentDetails?.ifs_Code || "",
      },
      documents: {
        gst: userData.documents?.gst || "",
        fssai: userData.documents?.fssai || "",
        pan: userData.documents?.pan || "",
        rc: userData.documents?.rc || "",
        dl: userData.documents?.dl || "",
        uidai: userData.documents?.uidai || "",
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

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    if (authUser) {
      loadProfileFromContext(authUser);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      const dataToSend = new FormData();

      dataToSend.append("fullName", formData.fullName);
      dataToSend.append("email", formData.email);
      dataToSend.append("mobileNumber", formData.mobileNumber);
      dataToSend.append("address", formData.address);
      dataToSend.append("city", formData.city);
      dataToSend.append("pin", formData.pin);
      dataToSend.append("dob", formData.dob);
      dataToSend.append("gender", formData.gender);

      dataToSend.append("restaurantName", formData.restaurantName);
      dataToSend.append("cuisine", formData.cuisine);

      dataToSend.append("geoLocation", JSON.stringify(formData.geoLocation));
      dataToSend.append(
        "paymentDetails",
        JSON.stringify(formData.paymentDetails),
      );
      dataToSend.append("documents", JSON.stringify(formData.documents));

      if (selectedFile) {
        dataToSend.append("profilePic", selectedFile);
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
    <div className="space-y-6 animate-fade-in font-sans pb-10 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex flex-col items-center shrink-0 mx-auto md:mx-0">
            <div className="relative group">
              <div className="w-36 h-36 rounded-full border-4 border-gray-100 shadow-inner overflow-hidden">
                <img
                  src={
                    imagePreview ||
                    "https://ui-avatars.com/api/?name=Restaurant&background=random"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <label
                className={`absolute bottom-1 right-1 bg-rose-600 text-white p-2.5 rounded-full cursor-pointer hover:bg-rose-700 transition-transform hover:scale-110 shadow-lg ${
                  !isEditing && "hidden"
                }`}
              >
                <Camera size={16} />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            {isEditing && (
              <p className="text-xs text-gray-400 mt-2">Click icon to change</p>
            )}
          </div>

          <div className="flex-1 w-full text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {formData.restaurantName || "Restaurant Name"}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                  <span className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border border-rose-100">
                    {formData.role}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border flex items-center gap-1 ${
                      formData.isActive === "active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {formData.isActive === "active" ? (
                      <CheckCircle2 size={10} />
                    ) : (
                      <AlertCircle size={10} />
                    )}
                    {formData.isActive}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      <X size={16} /> Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={saving}
                      className="px-5 py-2 bg-rose-600 text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 flex items-center gap-2"
                    >
                      {saving ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Save size={16} />
                      )}{" "}
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2 bg-rose-600 text-white rounded-xl font-semibold text-sm hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 flex items-center gap-2"
                  >
                    <Edit2 size={16} /> Edit Profile
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm">
                  <Mail size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-gray-400 font-bold uppercase">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-gray-800 break-all">
                    {formData.email}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg text-gray-500 shadow-sm">
                  <Phone size={16} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-gray-400 font-bold uppercase">
                    Phone
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {formData.mobileNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="w-1 h-6 bg-rose-500 rounded-full"></div>
          <h2 className="text-lg font-bold text-gray-800">
            General Information
          </h2>
        </div>
        <div className="p-6">
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
            label="Date of Birth"
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
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
            <MapPin size={18} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Location Details</h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
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
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
            <FileText size={18} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Legal Documents</h2>
        </div>
        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-0">
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
            label="PAN Card"
            name="pan"
            value={formData.documents.pan}
            section="documents"
            icon={CreditCard}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <ProfileField
            label="RC / Registration"
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
            icon={FileText}
            isEditing={isEditing}
            onChange={handleChange}
          />
          <ProfileField
            label="UIDAI (Aadhar)"
            name="uidai"
            value={formData.documents.uidai}
            section="documents"
            icon={User}
            isEditing={isEditing}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
            <Wallet size={18} />
          </div>
          <h2 className="text-lg font-bold text-gray-800">
            Banking & Payments
          </h2>
        </div>
        <div className="p-6">
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
      </div>

      {isEditing && (
        <div className="sticky bottom-4 z-10 flex justify-end gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-gray-200 shadow-2xl animate-in slide-in-from-bottom-5">
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200 flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantProfile;
