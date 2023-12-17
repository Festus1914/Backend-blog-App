const multer = require("multer");
const path = require("path");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for file uploads
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure multer for file upload
const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1000000, // Set the file size limit to 2MB
  },
  fileFilter: function (req, file, cb) {
    // Filter files based on their extension
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return cb(new Error("Only images (png, jpg, jpeg) are allowed"));
    }
    // Accept the file if it passes the filter
    cb(null, true);
  },
});

// Export the configured multer instance for picture uploads
module.exports = { uploadPicture };
