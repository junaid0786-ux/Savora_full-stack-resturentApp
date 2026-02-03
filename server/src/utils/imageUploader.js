export const UploadMultipleToCloudinary = async (multipleImages) => {
  const uploadedImages = [];
  const uploadMultiple = multipleImages.map(async (image) => {

    const result = await cloudinary.uploader.upload(image.path, {
      folder: "savora/menuItems",
    });
    
    uploadedImages.push({
      url: result.secure_url,
      publicID: result.public_id,
    });
  });
  await Promise.all(uploadMultiple);
  return uploadedImages;
};
