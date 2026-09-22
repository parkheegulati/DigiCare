// utils/cloudinary.js
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary using environment variables or fallback values
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'df0v2yuha',
  api_key: process.env.CLOUDINARY_API_KEY || '664459655796562',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'spFIg5G92KLT7pRBwz5rVFOChLk',
});

// Create a storage instance that configures folders/formats based on file field name
const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    if (file.fieldname === 'profileImage') {
      // For patients (if needed in other routes)
      return {
        folder: 'patients/profile_photos',
        allowed_formats: ['jpg', 'jpeg', 'png']
      };
    } else if (file.fieldname === 'documents') {
      // For patient documents
      return {
        folder: 'patients/documents',
        allowed_formats: ['pdf'],
        resource_type: 'raw'  // Important: set to raw for PDFs and other non-image files
      };
    } else if (file.fieldname === 'profilePhoto') {
      // For doctors
      return {
        folder: 'doctors/profile_photos',
        allowed_formats: ['jpg', 'jpeg', 'png']
      };
    }
    // Default fallback
    return {
      folder: 'others'
    };
  }
});

module.exports = { cloudinary, storage };
