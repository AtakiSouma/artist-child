/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, message } from "antd";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: React.FC<Props> = ({
  active,
  benefits,
  prerequisites,
  setActive,
  setBenefits,
  setPrerequisites,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      message.error("Please fill the required");
    }
  };
  console.log("Benefits", benefits);
  console.log("Prerequisites", prerequisites);
  return (
    <div className="w-[80%] m-auto mt-10 block">
      <div className="">
        <label className="text-[18px]" htmlFor="email">
          What are benefits for a children or kids can learn or achieve in this
          course . You must define exactly ?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <Input
            placeholder="You will receive multiple skills for drawing and designing ........"
            name="Benefit"
            required
            key={index}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
            id="benefits"
            className="mb-2"
            size="middle"
            allowClear
          />
        ))}
        <div className="flex gap-2 items-center ">
          <IoMdAddCircle
            size={40}
            color={"#003C43"}
            style={{ margin: "10px 0px", cursor: "pointer" }}
            onClick={handleAddBenefit}
          />
          <span>Add More benefit</span>
        </div>
      </div>

      <div className="">
        <label className="text-[18px]" htmlFor="email">
          What are prerequisites ?
        </label>
        <br />
        {prerequisites.map((prere: any, index: number) => (
          <Input
            placeholder="The kid must be have a basic skills in drawing......."
            name="Benefit"
            required
            value={prere.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            id="benefits"
            key={index}
            className="mb-2"
            size="middle"
            allowClear
          />
        ))}
        <div className="flex gap-2 items-center ">
          <IoMdAddCircle
            size={40}
            color={"#003C43"}
            style={{ margin: "10px 0px", cursor: "pointer" }}
            onClick={handleAddPrerequisites}
          />
          <span>Add More Prerequisites</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full md:w-[180px] h-[40px]
                  bg-[#135D66] text-center text-white   rounded  mt-8 cursor-pointer items-center flex flex-col justify-center"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full md:w-[180px] h-[40px]
                  bg-[#135D66] text-center items-center flex flex-col justify-center text-white  rounded  mt-8 cursor-pointer "
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
