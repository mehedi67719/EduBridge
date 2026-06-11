import { useState } from "react";

const CLOUD_NAME = "dkdav8g2p";
const UPLOAD_PRESET = "edu-bridge5644"; // 👈 Cloudinary dashboard থেকে নিতে হবে

const useCloudinaryUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    if (!file) return null;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log("🔥 Cloudinary Response:", data);

      if (!response.ok || !data.secure_url) {
        throw new Error(data.error?.message || "Upload failed");
      }

      return data.secure_url;
    } catch (err) {
      console.log("❌ Upload Error:", err.message);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { uploadImage, loading, error };
};

export default useCloudinaryUpload;