// src/api/uploadApi.js
import { IMAGE_ADD_URL } from "./apiUrls";


// 新增 addImage 函数，用于发送图片信息到 image/add 接口
export const addImage = async (name, url, from) => {
  try {
    const response = await fetch(IMAGE_ADD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, url, from }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("添加图片信息时出错:", error);
    throw error;
  }
};
