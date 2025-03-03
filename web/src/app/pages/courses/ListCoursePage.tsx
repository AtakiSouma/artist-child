/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BsThreeDots } from "react-icons/bs";

import { useAppDispatch } from "../../redux/hook";
import { Input, Pagination } from "antd";
import { CourseData } from "../../models/course.model";
import Table, { ColumnsType } from "antd/es/table";
import useCourse from "../../hooks/useCreate";
import {
  setCourseLoading,
  setCurrentPage,
  setSearchValue,
} from "../../redux/slice/courseSlice";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { LuPencilLine } from "react-icons/lu";

import { TitleComponent } from "../../components/TextComponent/TextComponents";
type columnProps = {
  currentPage: number;
  displayData: number;
};

const ListCoursePage = () => {
  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex flex-row items-center gap-2">
          <LuPencilLine />
          <p>Update</p>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className="flex flex-row items-center gap-2">
          <AiOutlineDelete />
          <p>Disable</p>
        </div>
      ),
      key: "1",
    },
  ];
  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<CourseData> => [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => {
        const pageSize = displayData;
        const calculatedIndex = (currentPage - 1) * pageSize + index + 1;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{calculatedIndex}</span>
          </div>
        );
      },
      width: "5%",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      width: "5%",
      render: (thumbnail) => (
        <div className="w-[40px] h-[40px]">
          <img
            src={
              thumbnail.url ||
              "https://cdn.donmai.us/original/1e/f8/1ef80a41ffae75b8f58f75ff8e1981ea.png"
            }
            alt={thumbnail.public_id}
            className="object-fill w-[100%] h-[100%] rounded-lg"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "stt",
      render: (name) => <div className=" text-md">{name}</div>,
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "stt",
      render: (price) => <div className=" text-md">{price}$</div>,
      width: "10%",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "stt",
      render: (level) => <div className=" text-md">{level}</div>,
      width: "10%",
    },
    {
      title: "Purchased",
      dataIndex: "purchased",
      key: "stt",
      render: (purchased) => <div className=" text-md">{purchased}</div>,
      width: "10%",
    },
    {
      title: "Purchased",
      dataIndex: "status",
      key: "stt",
      render: (status) => <div className=" text-md">{status}</div>,
      width: "10%",
    },
    {
      title: "Date created",
      dataIndex: "createdAt",
      key: "stt",
      render: (createdAt: Date) => {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return <div className="text-md">{formattedDate}</div>;
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "5%",
      render: (id) => (
        <>
          <Dropdown menu={{ items }}>
            <div className="flex flex-col items-center">
              <BsThreeDots
                className="hover:cursor-pointer"
                size={15}
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </Dropdown>
        </>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { Search } = Input;
  const {
    currentPage,
    pageCount,
    courseAdaptersByPage,
    courseLoading,
    searchValue,
  } = useCourse();
  const tableColumns = columns({ currentPage, displayData: 8 });
  console.log("course ", courseAdaptersByPage[currentPage]);
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (!courseAdaptersByPage[page]) {
      dispatch(setCourseLoading(false));
    }
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setCourseLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-8">
      <TitleComponent text="Course management" color="" level={2} />
      <div className="flex items-center justify-between mb-2">
        <Search
          placeholder="Search"
          className="w-[30%]"
          size="middle"
          onChange={(e: any) => dispatch(setSearchValue(e.target.value))}
          onKeyPress={handleSearchKeyPress}
        />
      </div>
      <Table
        columns={tableColumns}
        dataSource={courseAdaptersByPage[currentPage]}
        loading={!courseLoading}
        pagination={false}
        bordered={true}
        rowKey={(record) => record.id}
        className="items-center"
      />
      <Pagination
        className="flex justify-end mt-4"
        disabled={!courseLoading}
        current={currentPage}
        total={pageCount * 10}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ListCoursePage;
