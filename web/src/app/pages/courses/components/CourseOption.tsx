import React from "react";
import { IoMdCheckmark } from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
};
const CourseOption: React.FC<Props> = ({ active, setActive }) => {
  const options = [
    "Course information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <>
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {options.map((option: any, index: number) => (
          <div key={index} className={`w-full flex py-5`}>
            <div
              className={`w-[30px] h-[30px]  rounded-full flex items-center justify-center ${
                active + 1 > index ? "bg-[#135D66]" : "bg-[#384766"
              } relative`}
            >
              <IoMdCheckmark
                className={`text-[20px] ${
                  active + 1 > index ? "text-white" : "bg-[#384766"
                }  `}
              />
              {index !== options.length - 1 && (
                <div
                  className={`bottom-[-100%] absolute h-[30px] w-1 ${
                    active + 1 > index ? "bg-[#135D66]" : "bg-[#384766]"
                  }  `}
                ></div>
              )}
            </div>
            <h5
              className={`
            pl-3 text-[15px] ${
              active === index ? "text-[#135D66]" : "text-black"
            }
            `}
            >
              {option}
            </h5>
          </div>
        ))}
      </div>
    </>
  );
};

export default CourseOption;
