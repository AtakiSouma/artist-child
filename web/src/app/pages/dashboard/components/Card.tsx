import { BookOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

interface Props {
  title: String;
  count: Number;
}

const Card = (props: Props) => {
  const { title, count } = props;
  return (
    <div className="border-2 rounded-lg py-3 px-5 flex justify-between">
      <div className="">
        <div className=" text-gray-400">{title}</div>
        <div className="text-4xl font-bold">{String(count)}</div>
      </div>
      {title === "Customer" ? (
        <div className="w-16 rounded-full justify-center items-center">
          <UserOutlined className="col-span-1 bg-sky-200 w-full h-full rounded-full py-3 justify-center text-3xl text-sky-600" />
        </div>
      ) : title === "Instructor" ? (
        <div className="w-16 rounded-full justify-center items-center">
          <BookOutlined className="col-span-1 bg-red-200 w-full h-full rounded-full py-3 justify-center text-3xl text-red-600" />
        </div>
      ) : (
        <div className="w-16 rounded-full justify-center items-center">
          <ReadOutlined className="col-span-1 bg-green-200 w-full h-full rounded-full py-3 justify-center text-3xl text-green-600" />
        </div>
      )}
    </div>
  );
};

export default Card;
