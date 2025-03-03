/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConfigureStoreOptions } from "@reduxjs/toolkit";
import Input from "antd/es/input/Input";
import React, { useEffect, useState } from "react";
import { Image, Select, Space } from "antd";
import type { SelectProps } from "antd";
import { RiContactsBookUploadLine } from "react-icons/ri";
import agent from "../../../utils/agent";
const levelData = [
  {
    id: 1,
    value: "Beginner",
  },
  {
    id: 2,
    value: "Basic",
  },
  {
    id: 3,
    value: "Intermediate",
  },
  {
    id: 4,
    value: "Expert",
  },
];
type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};
const CourseInformation: React.FC<Props> = ({
  active,
  courseInfo,
  setActive,
  setCourseInfo,
}) => {
  const { Option } = Select;

  const { TextArea } = Input;
  const [dragging, setDragging] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const [categories, setCategoriesData] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const res = await agent.Categories.getAllCategories();

      setCategoriesData(res);
    };
    getCategories();
  }, [setCategoriesData]);
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      reader.onload = (_e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(categories);
  console.log("course info", courseInfo);
  return (
    <div className="w-[80%] m-auto mt-10">
      <form onSubmit={handleSubmit}>
        {/* TODO: Course Name */}
        <div>
          <label htmlFor="">Course Name</label>
          <Input
            placeholder="Input The Name of the Course"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            className=""
            size="middle"
            allowClear
          />
        </div>
        <br />
        {/* TODO: Course description */}
        <div>
          <label htmlFor="">Course Description</label>
          <TextArea
            placeholder="Write Something amazing  to make children interesting"
            name=""
            required
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
            id="description"
            allowClear
          />
        </div>
        <br />
        {/* TODO: price */}
        <div className="w-full flex justify-between">
          {/* TODO:price */}
          <div className="w-[45%]">
            <label htmlFor="">Price</label>
            <Input
              placeholder="Price"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              allowClear
            />
          </div>
          {/* TODO: estimate price */}
          <div className="w-[45%]">
            <label htmlFor="">Estimate Price (optional)</label>
            <Input
              placeholder="Estimate Price "
              name=""
              required
              value={courseInfo.estimatePrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatePrice: e.target.value })
              }
              id="estimatePrice"
              allowClear
            />
          </div>
        </div>
        <br />
        {/* TODO: Categopry and level */}
        {/* TODO: categories */}
        <div className="w-[50%}">
          <label htmlFor="">Category</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={(value) =>
              setCourseInfo({ ...courseInfo, categories: value })
            }
            allowClear
          >
            {categories.map((category: any) => (
              <Option key={category._id} value={category._id}>
                {category.title}
              </Option>
            ))}
          </Select>
        </div>
        {/* TODO: level*/}
        <div className="w-[50%}">
          <label htmlFor="">Level</label>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={(value) => setCourseInfo({ ...courseInfo, level: value })}
            allowClear
          >
            {levelData.map((level: any) => (
              <Option key={level.id} value={level.value}>
                {level.value}
              </Option>
            ))}
          </Select>
        </div>
        {/* TODO: Course description */}
        <div>
          <label htmlFor="">Course Description</label>
          <Input
            placeholder="video url"
            name="demoUrl"
            required
            value={courseInfo.demoUrl}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
            }
            id="demoUrl"
            allowClear
          />
        </div>
        <br />
        <div className="w-full">
          <label htmlFor="">Course Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] border-[#00000026] p-3 
          border flex items-center justify-center
          ${dragging ? "bg-[#135D66]" : "bg-transparent"}
          `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <>
                <Image
                  src={courseInfo.thumbnail}
                  alt=""
                  className="max-h-full w-full object-cover"
                />
              </>
            ) : (
              <>
                <span className="text-black">
                  Drag opr drop your thumbnail or click here to browse
                </span>
              </>
            )}
          </label>
        </div>
        <br />

        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-ful; md:w-[180px] h-[40px]
                  bg-[#135D66] text-center text-white  rounded 
mt-8 cursor-pointer

                  "
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
