// src/pages/Upload.jsx
import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { qiniuTokenApi } from "../api/qiniuTokenApi";
import * as qiniu from "qiniu-js"; // 引入七牛云 SDK

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadError(null);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      try {
        // 获取七牛云上传凭证
        const data = await qiniuTokenApi();
        // 配置上传参数
        const key = new Date().getTime() + "_" + selectedFile.name; // 文件名
        const putExtra = {
          fname: selectedFile.name,
          params: {},
          mimeType: selectedFile.type,
        };
        const config = {};

        // 开始上传
        const observable = qiniu.upload(
          selectedFile,
          key,
          data.token,
          putExtra,
          config
        );
        const subscriber = {
          next(res) {
            // 上传进度处理
            console.log("上传进度:", res.total.percent);
          },
          error(err) {
            // 上传错误处理
            setUploadError(err.message);
            setIsUploading(false);
          },
          complete(res) {
            // 上传完成处理
            console.log("上传成功，响应结果:", res);
            setUploadSuccess(true);
            setSelectedFile(null);
            setIsUploading(false);
          },
        };
        const subscription = observable.subscribe(subscriber);
      } catch (error) {
        setUploadError(error.message);
        setIsUploading(false);
      }
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4">照片上传页面</Typography>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          选择照片
        </Button>
      </label>
      {selectedFile && (
        <Typography sx={{ marginTop: "10px" }}>
          已选择文件: {selectedFile.name}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        sx={{ marginTop: "10px" }}
      >
        {isUploading ? "上传中..." : "上传照片"}
      </Button>
      {uploadError && (
        <Typography color="error" sx={{ marginTop: "10px" }}>
          {uploadError}
        </Typography>
      )}
      {uploadSuccess && (
        <Typography color="success" sx={{ marginTop: "10px" }}>
          上传成功！
        </Typography>
      )}
    </Box>
  );
};

export default Upload;
