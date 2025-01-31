// src/api/uploadApi.js
import { getQiniuToken } from "./qiniuTokenApi";

export const uploadPhoto = async (file) => {
  try {
    // 获取七牛云token
    const token = await getQiniuToken();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_token", token);
    formData.append("key", file.name); // 使用文件名作为 key

    // 七牛云上传接口地址，这里假设是七牛云的默认上传地址
    const qiniuUploadUrl = "http://up-z1.qiniup.com";

    const response = await fetch(qiniuUploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("上传照片到七牛云时出错:", error);
    throw error;
  }
};
