import React from "react";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Typography variant="h4">首页</Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/upload"
        sx={{ marginTop: "20px" }}
      >
        前往照片上传页面
      </Button>
    </div>
  );
};

export default Home;
