// src/api/qiniuTokenApi.js
import { QINIU_TOKEN_URL } from "./apiUrls";

export const qiniuTokenApi = async () => {
  try {
    // 发起 POST 请求
    const response = await fetch(QINIU_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 如果需要发送 JSON 数据，设置该请求头
      },
      // 如果需要发送数据，可以在这里设置 body，例如：
      // body: JSON.stringify({ someData: 'value' })
    });

    // 检查响应状态码
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 解析响应数据
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("获取七牛云 token 时出错:", error);
    throw error;
  }
};
