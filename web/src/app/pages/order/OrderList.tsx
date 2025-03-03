/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useAppDispatch } from "../../redux/hook";
import { Input, Pagination } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { OrderData } from "../../models/order.models";
import useOrder from "../../hooks/useOrder";
import {
  setCurrentPage,
  setOrderLoading,
  setSearchValue,
} from "../../redux/slice/orderSlice";
import { TitleComponent } from "../../components/TextComponent/TextComponents";

type columnProps = {
  currentPage: number;
  displayData: number;
};
const OrderList = () => {
  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<OrderData> => [
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
      dataIndex: "course",
      width: "5%",
      render: (course) => (
        <div className="w-[40px] h-[40px]">
          <img
            src={
              course.thumbnail.url ||
              "https://cdn.donmai.us/original/1e/f8/1ef80a41ffae75b8f58f75ff8e1981ea.png"
            }
            alt={course.thumbnail.public_id}
            className="object-fill w-[100%] h-[100%] rounded-lg"
          />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "course",
      key: "stt",
      render: (course) => <div className=" text-md">{course.price}$</div>,
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
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   width: "5%",
    //   render: (id) => (
    //     <>
    //       <Dropdown menu={{ items }}>
    //         <div className="flex flex-col items-center">
    //           <BsThreeDots
    //             className="hover:cursor-pointer"
    //             size={15}
    //             onClick={(e) => e.preventDefault()}
    //           />
    //         </div>
    //       </Dropdown>
    //     </>
    //   ),
    // },
  ];
  const dispatch = useAppDispatch();
  const { Search } = Input;
  const {
    currentPage,
    pageCount,
    orderAdaptersByPage,
    orderLoading,
    searchValue,
  } = useOrder();
  const tableColumns = columns({ currentPage, displayData: 8 });
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (!orderAdaptersByPage[page]) {
      dispatch(setOrderLoading(false));
    }
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setOrderLoading(false));
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
        dataSource={orderAdaptersByPage[currentPage]}
        loading={!orderLoading}
        pagination={false}
        bordered={true}
        rowKey={(record) => record.id}
        className="items-center"
      />
      <Pagination
        className="flex justify-end mt-4"
        disabled={!orderLoading}
        current={currentPage}
        total={pageCount * 10}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default OrderList;
