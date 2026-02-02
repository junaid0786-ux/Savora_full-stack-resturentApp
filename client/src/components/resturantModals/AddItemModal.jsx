import React, { useState, useEffect } from "react";
import {
  X,
  ImagePlus,
  Loader2,
  Check,
  Trash2,
  ChevronDown,
} from "lucide-react";

const AddItemModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    cuisine: "",
    type: "veg",
    servingSize: "",
    availability: true,
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        cuisine: "",
        type: "veg",
        servingSize: "",
        availability: true,
        image: null,
      });
      setPreviewUrl(null);
    }
  }, [isOpen]);

  const typeOptions = [
    "veg",
    "non-veg",
    "vegan",
    "egg",
    "gluten-free",
    "contains-nuts",
    "spicy",
    "sweet",
    "dessert",
    "dairy",
    "beverage",
  ];

  const categoryOptions = [
    "Starters",
    "Main Course",
    "Breads",
    "Rice & Biryani",
    "Desserts",
    "Beverages",
    "Snacks",
    "Combos",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFormData((prev) => ({ ...prev, image: null }));
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      onSave(formData);
      setLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  const labelClass = "block text-sm font-bold text-gray-700 mb-1.5";
  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-50/50 transition-all outline-none font-medium text-gray-700 placeholder-gray-400";
  const selectWrapperClass = "relative w-full";
  const selectIconClass =
    "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none";

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl shadow-2xl animate-fade-in-up">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-800 font-outfit">
              Add Menu Item
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Enter details to update your catalog
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
              <label className={labelClass}>Item Image</label>
              <div
                className={`w-full h-48 rounded-2xl border-2 border-dashed transition-all relative flex flex-col items-center justify-center cursor-pointer overflow-hidden group
                  ${previewUrl ? "border-rose-200 bg-white" : "border-gray-300 bg-gray-50 hover:border-rose-400 hover:bg-rose-50/30"}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={!!previewUrl}
                />

                {previewUrl ? (
                  <>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <button
                        onClick={removeImage}
                        className="bg-white text-red-500 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={16} /> Remove Image
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                      <ImagePlus size={24} className="text-rose-500" />
                    </div>
                    <p className="text-sm font-bold text-gray-600 group-hover:text-rose-600 transition-colors">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      SVG, PNG, JPG or GIF (max. 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className={labelClass}>
                  Item Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Butter Chicken Special"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Price (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Category <span className="text-rose-500">*</span>
                </label>
                <div className={selectWrapperClass}>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className={selectIconClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Cuisine <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="cuisine"
                  required
                  value={formData.cuisine}
                  onChange={handleChange}
                  placeholder="e.g. North Indian"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Serving Size <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="servingSize"
                  required
                  value={formData.servingSize}
                  onChange={handleChange}
                  placeholder="e.g. Serves 2"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Dietary Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {typeOptions.map((type) => (
                    <label
                      key={type}
                      className={`cursor-pointer border rounded-xl px-3 py-2 text-sm font-medium flex items-center justify-center gap-2 transition-all
                        ${
                          formData.type === type
                            ? "bg-rose-50 border-rose-500 text-rose-700 ring-1 ring-rose-500"
                            : "bg-white border-gray-200 text-gray-600 hover:border-rose-200 hover:bg-gray-50"
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
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="description"
                  required
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the taste, ingredients, and texture..."
                  className={`${inputClass} resize-none`}
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">
                  Available for Ordering
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  Toggle off if item is out of stock
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
            className="flex-2 py-3 px-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" /> Saving Item...
              </>
            ) : (
              <>
                <Check size={18} /> Add to Menu
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
