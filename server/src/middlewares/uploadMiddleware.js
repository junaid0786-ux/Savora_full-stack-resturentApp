import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
  }
  
  cb(null, true);
};

const upload = multer({
  storage,
  limits: { 
    fileSize: 5 * 1024 * 1024,  
    files: 5   
  },
  fileFilter,
});

export default upload;
