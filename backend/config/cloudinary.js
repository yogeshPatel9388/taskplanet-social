import { v2 as cloudinary } from "cloudinary";

/* Cloudinary configuration is initialized using secure environment variables */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

/* A warning is displayed if Cloudinary credentials are missing */
if (
  !process.env.CLOUD_NAME ||
  !process.env.CLOUD_KEY ||
  !process.env.CLOUD_SECRET
) {
  console.warn(
    "Cloudinary credentials are missing. Please check backend .env file.",
  );
}

export default cloudinary;
