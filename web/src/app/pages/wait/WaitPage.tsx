import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiJWT from "../../utils/apiJwt";

const WaitPage = () => {
  
  const backgroundImageUrl =
    "https://i0.wp.com/halcyonrealms.com/blogpics/japgifB.gif?resize=500%2C291&ssl=1";
  const navigate = useNavigate();
  const handleGoBack = async () => {
    try {
      // const response = await apiJWT.post(`/api/v1/auth/logout`);
      // if (response) {
      //   localStorage.clear();
        
        navigate("/login");
      // }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
        placement: "bottomLeft",
      });
    }
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-col gap-10 items-center justify-center relative shadow-md  drop-shadow-2xl rounded-sm bg-[#ffffff]
      overflow-hidden w-[1200px] max-w-[100%] min-h-[480px] h-[65%] mx-96 py-28  text-center"
      >
        <CheckCircleOutlined className="text-9xl text-[#77B0AA]" />
        <div className="text-4xl">Your Application has been sent!</div>
        <div>
          It will take some time for us to review your application, please wait
          for our response via email
        </div>
        {/* <Link to={`/login`}>Go Back</Link> */}
        <Button
          className="bg-purple border-none hover:text-pretty "
          htmlType="submit"
          size="large"
          type="primary"
          onClick={() => handleGoBack()}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default WaitPage;
