import { Button, notification } from "antd";
import React, { startTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import agent from "../../utils/agent";

const PaymentPage = () => {
  const backgroundImageUrl =
    "https://i0.wp.com/halcyonrealms.com/blogpics/japgifB.gif?resize=500%2C291&ssl=1";
  const navigate = useNavigate();
  const handleGoBack = async () => {
    try {
      startTransition(() => {
        navigate("/login");
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
        placement: "bottomLeft",
      });
    }
  };
  const generatePaymentUrl = async () => {
    try {
      const user = localStorage.getItem("user");
      const userObj = user ? JSON.parse(user) : {};
      const response = await agent.Payment.createCoursePaymentUrl(
        userObj.user.id
      );
      console.log(response)
      if (response) {
        window.location.href = response
        
      }
    } catch (error) {
      console.log(error);
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
      overflow-hidden w-[1200px] max-w-[100%] min-h-[480px] h-[65%] mx-96 py-10 px-20 text-center"
      >
        {/* <CheckCircleOutlined className="text-9xl text-[#77B0AA]" /> */}
        <img
          src={`https://cdn.dribbble.com/users/2393122/screenshots/4867246/money.gif`}
          className="h-60"
        />
        <div className="text-4xl">You have been accepted!</div>
        <div>
          As for the final step, you will need to register with our services,
          this will cost some fees. Once done, you can start sharing your
          knowledge with the younger genration
        </div>
        <div className="flex flex-col">
          <Button
            className="bg-purple border-none hover:text-pretty "
            htmlType="submit"
            size="large"
            type="primary"
            onClick={() => generatePaymentUrl()}
          >
            Start Transaction
          </Button>
          <div
            className="hover:underline hover:text-[#135D66] mt-2 cursor-pointer"
            onClick={() => handleGoBack()}
          >
            Go Back
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
