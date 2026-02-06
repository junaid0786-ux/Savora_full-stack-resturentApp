import React, { useState, useEffect } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import {
  X,
  ImagePlus,
  Loader2,
  Check,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UploadCloud,
} from "lucide-react";

const AddItemModal = ({ isOpen, onClose, onSave }) => {
  const INITIAL_STATE = {
    itemName: "",
    description: "",
    price: "",
    cuisine: "",
    type: "veg",
    servingSize: "",
    preparationTime: "",
    availability: true,
    images: [],
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [previews, setPreviews] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(INITIAL_STATE);
      setPreviews([]);
      setActiveImgIndex(0);
    }
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);

    const totalImages = formData.images.length + newFiles.length;

    if (totalImages > 5) {
      toast.error(
        `You can only add ${5 - formData.images.length} more image(s).`,
      );
      return;
    }

    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newFiles],
    }));

    setPreviews((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (indexToRemove) => {
    setPreviews((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));

    if (activeImgIndex >= indexToRemove && activeImgIndex > 0) {
      setActiveImgIndex((prev) => prev - 1);
    }
  };

  const removeAllImages = (e) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, images: [] }));
    setPreviews([]);
    setActiveImgIndex(0);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (previews.length <= 1) return;
    setActiveImgIndex((current) => (current + 1) % previews.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (previews.length <= 1) return;
    setActiveImgIndex(
      (current) => (current - 1 + previews.length) % previews.length,
    );
  };

  const validateForm = () => {
    if (!formData.itemName.trim()) return "Item Name is required";
    if (!formData.price || formData.price <= 0)
      return "Valid Price is required";
    if (!formData.cuisine.trim()) return "Cuisine is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      data.append("price", Number(formData.price));
      data.append("cuisine", formData.cuisine);
      data.append("type", formData.type);
      data.append("servingSize", formData.servingSize);
      data.append("preparationTime", formData.preparationTime);
      data.append(
        "availability",
        formData.availability ? "available" : "unavailable",
      );

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
          data.append("itemImages", file);
        });
      }

      const response = await api.post("/restaurant/addMenuItem", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Menu item added successfully!");
        onSave(response.data.data);
        onClose();
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Internal Server Error";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const labelStyle = "block text-sm font-bold text-gray-700 mb-1.5";
  const inputStyle =
    "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none font-medium text-gray-700 placeholder-gray-400";

  const typeOptions = [
    "veg",
    "non-veg",
    "vegan",
    "egg",
    "gluten-free",
    "spicy",
    "dessert",
    "beverage",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-outfit">
              Add Menu Item
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Add details and up to 5 images
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-6 custom-scrollbar">
          <form id="addItemForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="w-full">
              <label className={labelStyle}>
                Item Images{" "}
                <span className="text-xs font-normal text-gray-400">
                  ({formData.images.length}/5)
                </span>
              </label>

              <div
                className={`w-full h-64 rounded-2xl border-2 border-dashed transition-all relative flex flex-col items-center justify-center overflow-hidden group ${
                  previews.length > 0
                    ? "border-rose-200 bg-black/5"
                    : "border-gray-300 bg-gray-50 hover:border-rose-400 hover:bg-rose-50/30"
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={formData.images.length >= 5}
                  className={`absolute inset-0 w-full h-full opacity-0 z-10 ${formData.images.length >= 5 ? "cursor-not-allowed" : "cursor-pointer"}`}
                />

                {previews.length > 0 ? (
                  <div className="w-full h-full relative flex flex-col">
                    <div className="flex-1 relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      <img
                        src={previews[activeImgIndex]}
                        alt={`Slide ${activeImgIndex}`}
                        className="h-full w-full object-contain transition-opacity duration-300"
                      />

                      <button
                        onClick={removeAllImages}
                        className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-red-600 transition-colors flex items-center gap-1.5 z-30 pointer-events-auto"
                      >
                        <Trash2 size={12} /> Clear All
                      </button>

                      {previews.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 z-20 pointer-events-auto"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 z-20 pointer-events-auto"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="h-20 bg-white border-t border-gray-200 p-2 flex items-center gap-2 overflow-x-auto shrink-0 z-20">
                      {previews.map((src, index) => (
                        <div
                          key={index}
                          className="relative group/thumb shrink-0"
                        >
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveImgIndex(index);
                            }}
                            className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                              activeImgIndex === index
                                ? "border-rose-500 ring-2 ring-rose-200"
                                : "border-gray-200 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={src}
                              alt="thumb"
                              className="w-full h-full object-cover"
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeImage(index);
                            }}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md opacity-0 group-hover/thumb:opacity-100 transition-opacity z-30"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}

                      {formData.images.length < 5 && (
                        <div className="w-14 h-14 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                          <ImagePlus size={20} />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-4 pointer-events-none">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-3">
                      <UploadCloud size={28} className="text-rose-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">
                      Click to upload images
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelStyle}>
                  Item Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="e.g. Butter Chicken Special"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Cuisine <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="cuisine"
                  value={formData.cuisine}
                  onChange={handleChange}
                  placeholder="e.g. North Indian"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Serving Size</label>
                <input
                  type="text"
                  name="servingSize"
                  value={formData.servingSize}
                  onChange={handleChange}
                  placeholder="e.g. Serves 2"
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>Prep Time</label>
                <input
                  type="text"
                  name="preparationTime"
                  value={formData.preparationTime}
                  onChange={handleChange}
                  placeholder="e.g. 25 mins"
                  className={inputStyle}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>Dietary Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {typeOptions.map((type) => (
                    <label
                      key={type}
                      className={`cursor-pointer border rounded-xl px-2 py-2.5 text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${
                        formData.type === type
                          ? "bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500 shadow-sm"
                          : "bg-white border-gray-200 text-gray-500 hover:border-rose-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {type}
                      {formData.type === type && <Check size={14} />}
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>Description</label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item..."
                  className={`${inputStyle} resize-none`}
                ></textarea>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">
                  In Stock
                </span>
                <span className="text-xs text-gray-500">
                  Available for ordering
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-white rounded-b-3xl shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-2 py-3 px-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed min-w-35"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Check size={18} />
            )}
            {loading ? "Saving..." : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
