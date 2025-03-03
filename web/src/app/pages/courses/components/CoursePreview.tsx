/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { FaCheckDouble } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import type { CheckboxProps } from "antd";
import ReactPlayer from "react-player";
import { Button, Checkbox, Divider, Modal, Typography } from "antd";
import Input from "antd/es/input/Input";
import Ratings from "../../../utils/Rating";
type Props = {
  active: number;
  setActive: (active: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  courseData: any;
  handleCourseCreate: any;
};
const CoursePreview: React.FC<Props> = ({
  active,
  courseData,
  handleCourseCreate,
  setActive,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [checked, setChecked] = useState<boolean>(false);
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setChecked(e.target.checked);
    console.log("setCheck", checked);
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    handleCourseCreate();
  };
  const discountPercentage =
    ((courseData?.estimatePrice - courseData?.price) /
      courseData?.estimatePrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  console.log("demiourl", courseData.demoUrl);
  return (
    <>
      <div className="w-[80%] m-auto py-5 mb-5">
        <div className="w-full relative">
          <div className="w-full mt-10">
            <ReactPlayer url={courseData?.demoUrl} width="100%" height="100%" playing controls={true} />

            {/* <CoursePlayer
              videoUrl={courseData?.demoUrl}
              title={courseData?.title}
            /> */}
          </div>
          <div className="flex items-center">
           
            <h1 className="pt-5 text-[20px]">
              {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
            </h1>
            <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
              {courseData?.estimatePrice}$
            </h5>
            <h4 className="pl-5 pt-4 text-[22px]  text-yellow-600">
              {discountPercentagePrice}%Off
            </h4>
          </div>
          <div className="flex items-center">
            <Button size="large" icon={<CiShoppingBasket />} type="primary">
              Buy Now {courseData.price}$
            </Button>
          </div>
          <div className="flex items-center mt-5 gap-2">
            <Input placeholder="Discount here" className="w-[70%]" />
            <Button type="primary" shape="round" icon={<CiDiscount1 />}>
              Apply
            </Button>
          </div>
          <div className="flex flex-col gap-2 m;-1 mt-4">
            <div className="flex flex-row gap-3 items-center">
              <FaCheckDouble />
              <Typography>Full life time Access</Typography>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <FaCheckDouble />
              <Typography>Certificate when completion</Typography>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <FaCheckDouble />
              <Typography>Expert Instructors support all time</Typography>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <FaCheckDouble />
              <Typography>Premium supports by message and email </Typography>
            </div>
          </div>
          <div className="w-full">
            <div className="w-full md:pr-5">
              <h1 className="text-[20px] font-[600]">
                Name :
                <span className="text-[#135D66] font-bold">
                  {" "}
                  {courseData?.name}
                </span>
              </h1>

              <div className=" items-center justify-between pt-3">
                <div className="flex items-center">
                  <Ratings rating={0} />
                  <h5>0 reviews</h5>
                </div>
                <h5>0 children study</h5>
              </div>
              <Divider />
              <Typography className="text-[20px]">
                What children or kids can learn in this course
              </Typography>
            </div>
            {courseData?.benefits?.map((item: any, index: number) => (
              <div className="w-full flex md:items-center py-2 " key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkCircle size={20} color="#135D66" />
                </div>
                <div className="pl-2">{item.title}</div>
              </div>
            ))}
            <Divider />
            <div className="w-full">
              <h1 className="text-[20px] font-[600]">Course Details</h1>
              <p className=" whitespace-pre-line w-full overflow-hidden">
                {courseData?.description}
              </p>
            </div>
          </div>
          <Divider />
          <Checkbox onChange={onChange}>
            <Button type="link" onClick={showModal}>
              Please make sure you read carefully our web's policy{" "}
            </Button>
          </Checkbox>
          <Divider />
          <div className="w-full flex items-center justify-between">
            <div
              className="w-full md:w-[180px] h-[40px]
                  bg-[#135D66] text-center text-white   rounded  mt-8 cursor-pointer items-center flex flex-col justify-center"
              onClick={() => prevButton()}
            >
              Prev
            </div>
            {checked ? (
              <div
                className="w-full md:w-[180px] h-[40px]
                  bg-[#135D66] text-center items-center flex flex-col justify-center text-white  rounded  mt-8 cursor-pointer "
                onClick={() => handleOptions()}
              >
                Create Course Now!
              </div>
            ) : (
              <div
                className="w-full md:w-[180px] h-[40px]
                  bg-gray-500 text-center items-center flex flex-col justify-center text-white  rounded  mt-8 cursor-pointer "
                onClick={(e: any) => e.preventDefault()}
              >
                Read & Check Policy
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        title="Privacy Policy"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <h2>Welcome to [Artist for Kids]!</h2>
          <p>
            Artist is committed to protecting the privacy of its users. This
            Privacy Policy describes how we collect, use, and disclose your
            information when you use our website.
          </p>

          <h3>Information We Collect</h3>
          <p>
            - <strong>Personal Information:</strong> We may collect personal
            information such as your name, email address, and payment details
            when you register an account or make a purchase on our website.
            <br />- <strong>Usage Information:</strong> We collect information
            about how you interact with our website, such as your browsing
            activity, the pages you visit, and the duration of your visit.
          </p>

          <h3>How We Use Your Information</h3>
          <p>
            - <strong>To Provide Services:</strong> We use your personal
            information to provide you with access to our courses and learning
            materials.
            <br />- <strong>To Improve Our Services:</strong> We analyze usage
            data to improve our website, content, and services to better meet
            the needs of our users.
            <br />- <strong>To Communicate With You:</strong> We may send you
            important updates, newsletters, promotional offers, and other
            communications related to our services.
          </p>

          {/* Add more sections as needed */}

          <h3>Children's Privacy</h3>
          <p>
            Our website is intended for a general audience and is not directed
            at children under the age of 13. We do not knowingly collect
            personal information from children under 13.
          </p>

          {/* Add more sections as needed */}
        </div>
      </Modal>
    </>
  );
};

export default CoursePreview;
