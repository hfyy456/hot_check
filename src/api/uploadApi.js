// src/api/uploadApi.js
import { UPLOAD_URL } from "./apiUrls";

export const uploadPhoto = async (file) => {
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("上传照片时出错:", error);
    throw error;
  }
};
