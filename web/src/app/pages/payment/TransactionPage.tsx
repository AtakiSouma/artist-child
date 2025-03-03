import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiJWT from "../../utils/apiJwt";
import agent from "../../utils/agent";

const TransactionPage = () => {
  const backgroundImageUrl =
    "https://i0.wp.com/halcyonrealms.com/blogpics/japgifB.gif?resize=500%2C291&ssl=1";
  const navigate = useNavigate();
  const [transctionStatus, setTransactionStatus] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleGoHome = async () => {
    try {
      navigate("/course");
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
        placement: "bottomLeft",
      });
    }
  };

  useEffect(() => {
    try {
      setIsLoading(true);
      const user = localStorage.getItem("user");
      const userObj = user ? JSON.parse(user) : {};
      const url = window.location.href;
      const queryString = url.substring(url.indexOf("?") + 1);
      if (queryString.includes("vnp_TransactionStatus=00")) {
        setTransactionStatus(true);
        const postPayment = async () => {
          const response = await agent.Payment.getReturnPaymentUrl(
            userObj.user.id,
            queryString
          );
          if (response) {
            setIsLoading(false);
          }
        };
        postPayment();
      } else {
        setTransactionStatus(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
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
          {transctionStatus ? (
            <CheckCircleOutlined className="text-9xl text-[#77B0AA]" />
          ) : (
            <CloseCircleOutlined className="text-9xl text-red-600" />
          )}

          <div className="text-4xl">
            Transaction is {transctionStatus ? "success" : "fail"}
          </div>
          <Button
            className="bg-purple border-none hover:text-pretty "
            htmlType="submit"
            size="large"
            type="primary"
            onClick={() => handleGoHome()}
          >
            Go to Home
          </Button>
        </div>
      </div>
      <Modal footer={null} closable={false} open={isLoading}>
        <div className="flex flex-col items-center justify-center">
          <Spin size="large"></Spin>
          <span>Loading...</span>
        </div>
      </Modal>
    </>
  );
};

export default TransactionPage;
