// src/UploadPage.jsx
import React, { useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { uploadPhoto } from "../api/uploadApi";

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
        const result = await uploadPhoto(selectedFile);
        console.log("上传成功，响应结果:", result);
        setUploadSuccess(true);
        setSelectedFile(null);
      } catch (error) {
        setUploadError(error.message);
      } finally {
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
