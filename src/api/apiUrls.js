// src/api/apiUrls.js
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const UPLOAD_URL = `${BASE_URL}/upload`;
export const REGISTER_URL = `${BASE_URL}/register`;
export const HOME_DATA_URL = `${BASE_URL}/home-data`;
// 新增获取七牛云token的接口地址
export const QINIU_TOKEN_URL = `${BASE_URL}/qiniu/token`;
