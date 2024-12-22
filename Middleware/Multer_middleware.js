import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'; // Correct for ESM

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'user_profiles', // Folder name in Cloudinary
      allowed_formats: ['jpeg', 'png', 'jpg'], // Allow only images
    },
  });

  const upload = multer({ storage });
export default upload;