/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import CoursePreview from "./components/CoursePreview";
import CourseOptions from "./components/CourseOption";
import CourseInformation from "./components/CourseInformation";
import CourseData from "./components/CourseData";
import { Spin, message } from "antd";

import CourseContent from "./components/CourseContent";

import { useNavigate } from "react-router-dom";
import apiJWT from "../../utils/apiJwt";
import { UserData } from "../../models/auth.models";
const CreateCoursePage = () => {
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);

  console.log("user", userDataObject);
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    instructor: userDataObject.user.id,
    name: "",
    description: "",
    price: 0,
    estimatePrice: 0,
    thumbnail: "",
    categories: "",
    level: "",

    demoUrl: "",
  });

  const navigate = useNavigate();
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "", //   videoThumbnail: Object,
      title: "",
      videoSection: "Untitled Section",
      description: "",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const [courseData, setCourseData] = useState({});
  const handleSubmit = async () => {
    // format benefits
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    // format prerequisite
    const formattedPrerequisite = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    // format content data
    const formattedContentData = courseContentData.map((courseContent) => ({
      videoUrl: courseContent.videoUrl,
      title: courseContent.title,
      description: courseContent.description,
      videoSection: courseContent.videoSection,
      links: courseContent.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: courseContent.suggestion,
    }));

    // prepare for data object
    const data = {
      instructor: courseInfo.instructor,
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatePrice: courseInfo.estimatePrice,
      categories: courseInfo.categories,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisite,
      courseContentData: formattedContentData,
    };
    setCourseData(data);
  };
  console.log(
    "benefits",
    benefits,
    "prere",
    prerequisites,
    "conetnt",
    courseContentData
  );
  console.log("Final Form for backend", courseData);
  const [loading, setLoading] = useState(false);
  const handleCourseCreate = async () => {
    try {
      setLoading(true);
      const response = await apiJWT.post("/api/v1/course", courseData);
      if (response.status === 201) {
        setLoading(false);
        navigate("/dashboard");
        message.success("Create course successfully");
      } else if (response.status === 200) {
        setLoading(false);
        navigate("/dashboard");
        message.success("Create course successfully");
      } else {
        message.error("Create course failed");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <>
      {loading ? (
        <div className="flex items-center flex-col justify-center mt-64">
          <Spin tip="Create a course will take a few second....." size="large">
            <div className="content w-[500px]" />
          </Spin>
        </div>
      ) : (
        <div className="w-full flex min-h-screen">
          <div className="w-[80%]">
            {active === 0 && (
              <CourseInformation
                courseInfo={courseInfo}
                setCourseInfo={setCourseInfo}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 1 && (
              <CourseData
                benefits={benefits}
                setBenefits={setBenefits}
                prerequisites={prerequisites}
                setPrerequisites={setPrerequisites}
                active={active}
                setActive={setActive}
              />
            )}
            {active === 2 && (
              <CourseContent
                active={active}
                setActive={setActive}
                courseContentData={courseContentData}
                setCourseContentData={setCourseContentData}
                handleSubmit={handleSubmit}
              />
            )}
            {active === 3 && (
              <CoursePreview
                active={active}
                setActive={setActive}
                courseData={courseData}
                handleCourseCreate={handleCourseCreate}
              />
            )}
          </div>
          <div className="w-[20%]  mt-[20px] border-[2px] h-[300px] rounded-lg p-2">
            <CourseOptions active={active} setActive={setActive} />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCoursePage;
