import React, { useState, useEffect } from "react";
import api from "../../config/Api";
import toast from "react-hot-toast";
import {
  X,
  ImagePlus,
  Loader2,
  Check,
  ChevronLeft,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";

const EditMenuItemModal = ({ onClose, selectedItem, onUpdate }) => {
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    cuisine: "",
    type: "veg",
    servingSize: "",
    preparationTime: "",
    availability: true,
  });

  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        itemName: selectedItem.itemName || "",
        description: selectedItem.description || "",
        price: selectedItem.price || "",
        cuisine: selectedItem.cuisine || "",
        type: selectedItem.type || "veg",
        servingSize: selectedItem.servingSize || "",
        preparationTime: selectedItem.preparationTime || "",
        availability: selectedItem.availability === "available",
      });
    }
  }, [selectedItem]);

  useEffect(() => {
    return () => previews.forEach((url) => URL.revokeObjectURL(url));
  }, [previews]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }
    setNewImages(files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    setActiveImgIndex(0);
  };

  const clearNewImages = () => {
    setNewImages([]);
    setPreviews([]);
    setActiveImgIndex(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("itemName", formData.itemName);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("cuisine", formData.cuisine);
      data.append("type", formData.type);
      data.append("servingSize", formData.servingSize);
      data.append("preparationTime", formData.preparationTime);
      data.append(
        "availability",
        formData.availability ? "available" : "unavailable",
      );

      if (newImages.length > 0) {
        newImages.forEach((file) => {
          data.append("itemImages", file);
        });
      }

      const response = await api.put(
        `/restaurant/editMenuItem/${selectedItem._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      if (response.status === 201) {
        toast.success("Menu Item Updated Successfully");
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update item");
    } finally {
      setLoading(false);
    }
  };

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

  const displayImages =
    previews.length > 0
      ? previews
      : selectedItem?.images?.map((img) => img.url) || [];
  const isShowingNew = previews.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-outfit">
              Edit Menu Item
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Update details for {selectedItem?.itemName}
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="w-full">
              <label className={labelStyle}>
                Item Images{" "}
                <span className="text-xs font-normal text-gray-400">
                  {isShowingNew ? "(New Images Selected)" : "(Current Images)"}
                </span>
              </label>

              <div
                className={`w-full h-64 rounded-2xl border-2 border-dashed transition-all relative flex flex-col items-center justify-center overflow-hidden group ${displayImages.length > 0 ? "border-rose-200 bg-black/5" : "border-gray-300 bg-gray-50 hover:border-rose-400 hover:bg-rose-50/30 cursor-pointer"}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className={`absolute inset-0 w-full h-full opacity-0 z-10 ${displayImages.length > 0 && "hidden"}`}
                />

                {displayImages.length > 0 ? (
                  <div className="w-full h-full relative flex flex-col">
                    <div className="flex-1 relative w-full h-full bg-gray-900 flex items-center justify-center overflow-hidden">
                      <img
                        src={displayImages[activeImgIndex]}
                        alt="Preview"
                        className="h-full w-full object-contain"
                      />

                      {displayImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImgIndex(
                                (i) =>
                                  (i - 1 + displayImages.length) %
                                  displayImages.length,
                              )
                            }
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 z-20"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveImgIndex(
                                (i) => (i + 1) % displayImages.length,
                              )
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 z-20"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </>
                      )}

                      {isShowingNew ? (
                        <button
                          type="button"
                          onClick={clearNewImages}
                          className="absolute top-3 right-3 bg-red-500/90 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-red-600 flex items-center gap-1.5 z-30"
                        >
                          <X size={12} /> Cancel Upload
                        </button>
                      ) : (
                        <label className="absolute top-3 right-3 bg-rose-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm hover:bg-rose-700 flex items-center gap-1.5 z-30 cursor-pointer">
                          <ImagePlus size={12} /> Replace Images
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                      <ImagePlus size={24} className="text-rose-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-600 group-hover:text-rose-600 transition-colors">
                      Click to upload images
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
                  required
                  value={formData.itemName}
                  onChange={handleChange}
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
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
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
                  required
                  value={formData.cuisine}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Serving Size <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="servingSize"
                  required
                  value={formData.servingSize}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className={labelStyle}>
                  Prep Time <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="preparationTime"
                  required
                  value={formData.preparationTime}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>
                  Dietary Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {typeOptions.map((type) => (
                    <label
                      key={type}
                      className={`cursor-pointer border rounded-xl px-2 py-2 text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all ${formData.type === type ? "bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500" : "bg-white border-gray-200 text-gray-500 hover:border-rose-200 hover:bg-gray-50"}`}
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
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelStyle}>
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
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
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-gray-100 bg-white rounded-b-3xl shrink-0 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-2 py-3 px-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <RefreshCcw size={18} />
            )}
            {loading ? "Updating..." : "Update Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenuItemModal;
